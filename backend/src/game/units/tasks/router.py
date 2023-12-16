import uuid
from uuid import UUID

from fastapi import APIRouter

from game.units.tasks.enums import TaskStates
from game.units.tasks.questions.answers.schemas import EmployeeAnswerRead, EmployeeAnswerPost
from game.units.tasks.questions.schemas import EmployeeTestQuestionPost, EmployeeTestQuestionRead, \
    EmployeeOpenQuestionPost
from game.units.tasks.schemas import TestTaskUnitRead, TestTaskUnitCreate, TestTaskUnitUpdate, DiscussionTaskUnitCreate, \
    DiscussionTaskUnitRead, DiscussionTaskUnitUpdate, EmployeeTaskRead
from users.employees.schemas import EmployeeUpdate
from utils.types import TaskUnitServiceType, AnswerOptionServiceType, EmployeeTaskServiceType, CurrentUser, \
    EmployeeServiceType

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
                              answer_option_service: AnswerOptionServiceType,
                              task_unit_service: TaskUnitServiceType,
                              user: CurrentUser,
                              employee_service: EmployeeServiceType) -> list[EmployeeTestQuestionRead]:
    result, answers_correctness = await get_all_answers(employee_questions_answers, answer_option_service, task_id)
    if all(answers_correctness):

        reward = (await task_unit_service.get_one(task_id)).score_reward
        await employee_service.update_one(user.employee.id, EmployeeUpdate(coins=user.employee.coins + reward))
    return result


async def get_all_answers(
        employee_questions_answers: list[EmployeeTestQuestionPost],
        answer_option_service: AnswerOptionServiceType,
        task_id: UUID) -> (list[EmployeeTestQuestionRead], list[bool]):
    result, answers_correctness = [], []
    for question_answer in employee_questions_answers:
        correct_answers_ids_on_question = await answer_option_service.get_all_correct(question_answer.id)
        question_read_answers = []
        for answer in question_answer.answers:
            answer_was_selected_correct = is_answer_selected_correct(answer, set(correct_answers_ids_on_question))

            answers_correctness.append(answer_was_selected_correct)
            question_read_answers.append(EmployeeAnswerRead(answer=answer.answer,
                                                            was_selected_correct=answer_was_selected_correct))
        result.append(EmployeeTestQuestionRead(id=question_answer.id,
                                               task_id=task_id,
                                               type=question_answer.type,
                                               question=question_answer.question,
                                               results=question_read_answers))
    return result, answers_correctness


def is_answer_selected_correct(answer: EmployeeAnswerPost, correct_answers_ids_on_question: set[UUID]) -> bool:
    correct_answer_selected = answer.is_selected and answer.id in correct_answers_ids_on_question
    incorrect_answer_not_selected = not answer.is_selected and answer.id not in correct_answers_ids_on_question
    return correct_answer_selected or incorrect_answer_not_selected


@router.post("/maps/{map_id}/modules/{module_id}/levels/{level_id}/tasks/{task_id}/review/")
async def submit_task_unit_for_review(map_id: UUID,
                                      module_id: UUID,
                                      level_id: UUID,
                                      task_id: UUID,
                                      employee_questions_answers: list[EmployeeOpenQuestionPost],
                                      employee_task_service: EmployeeTaskServiceType) -> EmployeeTaskRead:
    # TODO: Реализовать
    return EmployeeTaskRead()


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
