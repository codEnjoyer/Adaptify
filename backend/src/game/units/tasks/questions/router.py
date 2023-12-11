from uuid import UUID

from fastapi import APIRouter

from game.units.tasks.questions.answers.schemas import EmployeeAnswerRead
from game.units.tasks.questions.enums import QuestionTypes
from game.units.tasks.questions.schemas import QuestionRead, QuestionCreate, QuestionUpdate, EmployeeQuestionPost, \
    EmployeeQuestionRead
from utils.types import QuestionServiceType, TaskUnitServiceType, AnswerOptionServiceType

router = APIRouter(tags=["Questions"])


@router.get('/questions/', tags=["Dev"])
async def root(question_service: QuestionServiceType) -> list[QuestionRead]:
    return await question_service.get_all()


@router.post('/maps/{map_id}/modules/{module_id}/levels/{level_id}/tasks/{task_id}/')
async def post_question_to_task_unit(map_id: UUID,
                                     module_id: UUID,
                                     level_id: UUID,
                                     task_id: UUID,
                                     question_create: QuestionCreate,
                                     question_service: QuestionServiceType) -> QuestionRead:
    return await question_service.create_one(task_id, question_create)


@router.post("/maps/{map_id}/modules/{module_id}/levels/{level_id}/tasks/{task_id}/check/")
async def autocheck_task_unit(map_id: UUID,
                              module_id: UUID,
                              level_id: UUID,
                              task_id: UUID,
                              employee_questions_answers: list[EmployeeQuestionPost],
                              answer_option_service: AnswerOptionServiceType) -> list[EmployeeQuestionRead]:
    result = []
    for question_answer in employee_questions_answers:
        user_answers_on_question = question_answer.answers
        correct_answers_ids_on_question = await answer_option_service.get_all_correct(question_answer.id)
        correct_answers_ids_on_question = set(correct_answers_ids_on_question)
        question_read_answers = []
        for answer in user_answers_on_question:
            correct_answer_selected = answer.is_selected and answer.id in correct_answers_ids_on_question
            incorrect_answer_not_selected = not answer.is_selected and answer.id not in correct_answers_ids_on_question
            answer_was_selected_correct = correct_answer_selected or incorrect_answer_not_selected
            answer_read = EmployeeAnswerRead(answer=answer.answer, was_selected_correct=answer_was_selected_correct)
            question_read_answers.append(answer_read)
        question_read = EmployeeQuestionRead(type=question_answer.type,
                                             question=question_answer.question,
                                             results=question_read_answers)
        result.append(question_read)
    return result


@router.delete("/maps/{map_id}/modules/{module_id}/levels/{level_id}/tasks/{task_id}/questions/{question_id}/")
async def delete_question_from_task_unit(map_id: UUID,
                                         module_id: UUID,
                                         level_id: UUID,
                                         task_id: UUID,
                                         question_id: UUID,
                                         question_service: QuestionServiceType) -> QuestionRead:
    return await question_service.delete_one(question_id)


@router.patch("/maps/{map_id}/modules/{module_id}/levels/{level_id}/tasks/{task_id}/questions/{question_id}/")
async def update_question_in_task_unit(map_id: UUID,
                                       module_id: UUID,
                                       level_id: UUID,
                                       task_id: UUID,
                                       question_id: UUID,
                                       question_update: QuestionUpdate,
                                       question_service: QuestionServiceType) -> QuestionRead:
    return await question_service.update_one(question_id, question_update)
