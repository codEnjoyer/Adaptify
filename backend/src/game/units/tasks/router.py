import uuid
from uuid import UUID

from fastapi import APIRouter

from game.units.tasks.enums import TaskStates
from game.units.tasks.questions.answers.schemas import EmployeeAnswerRead
from game.units.tasks.questions.schemas import EmployeeTestQuestionPost, EmployeeTestQuestionRead, \
    EmployeeOpenQuestionPost
from game.units.tasks.schemas import TestTaskUnitRead, TestTaskUnitCreate, TestTaskUnitUpdate, DiscussionTaskUnitCreate, \
    DiscussionTaskUnitRead, DiscussionTaskUnitUpdate, EmployeeTaskRead
from utils.types import TaskUnitServiceType, AnswerOptionServiceType, EmployeeTaskServiceType

router = APIRouter(tags=["Task"])


@router.get("/tasks/", tags=['Dev'])
async def root(task_unit_service: TaskUnitServiceType) -> list[TestTaskUnitRead | DiscussionTaskUnitRead]:
    return await task_unit_service.get_all()


@router.post("/maps/{map_id}/modules/{module_id}/levels/{level_id}/tasks/")
async def post_task_unit_to_level(map_id: UUID,
                                  module_id: UUID,
                                  level_id: UUID,
                                  task_create: TestTaskUnitCreate | DiscussionTaskUnitCreate,
                                  task_unit_service: TaskUnitServiceType) -> TestTaskUnitRead | DiscussionTaskUnitRead:
    return await task_unit_service.create_one(level_id, task_create)


@router.post("/maps/{map_id}/modules/{module_id}/levels/{level_id}/tasks/{task_id}/check/")
async def autocheck_task_unit(map_id: UUID,
                              module_id: UUID,
                              level_id: UUID,
                              task_id: UUID,
                              employee_questions_answers: list[EmployeeTestQuestionPost],
                              answer_option_service: AnswerOptionServiceType) -> list[EmployeeTestQuestionRead]:
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
        question_read = EmployeeTestQuestionRead(type=question_answer.type,
                                                 question=question_answer.question,
                                                 results=question_read_answers)
        result.append(question_read)
    return result


@router.post("/maps/{map_id}/modules/{module_id}/levels/{level_id}/tasks/{task_id}/review/")
async def submit_task_unit_for_review(map_id: UUID,
                                      module_id: UUID,
                                      level_id: UUID,
                                      task_id: UUID,
                                      employee_questions_answers: list[EmployeeOpenQuestionPost],
                                      employee_task_service: EmployeeTaskServiceType) -> EmployeeTaskRead:
    await employee_task_service.create_one()
    return EmployeeTaskRead(task_id=task_id, employee_id=uuid.uuid4(), state=TaskStates.Submitted)


@router.delete("/maps/{map_id}/modules/{module_id}/levels/{level_id}/tasks/{task_id}/")
async def delete_task_unit_from_level(map_id: UUID,
                                      module_id: UUID,
                                      level_id: UUID,
                                      task_id: UUID,
                                      task_unit_service: TaskUnitServiceType) -> TestTaskUnitRead | DiscussionTaskUnitRead:
    return await task_unit_service.delete_one(task_id)


@router.patch("/maps/{map_id}/modules/{module_id}/levels/{level_id}/tasks/{task_id}/")
async def update_task_unit_in_level(map_id: UUID,
                                    module_id: UUID,
                                    level_id: UUID,
                                    task_id: UUID,
                                    task_update: TestTaskUnitUpdate | DiscussionTaskUnitUpdate,
                                    task_unit_service: TaskUnitServiceType) -> TestTaskUnitRead | DiscussionTaskUnitRead:
    return await task_unit_service.update_one(task_id, task_update)
