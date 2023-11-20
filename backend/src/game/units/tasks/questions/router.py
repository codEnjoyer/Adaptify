from uuid import UUID

from fastapi import APIRouter

from game.units.tasks.questions.schemas import QuestionRead, QuestionCreate, QuestionUpdate
from utils.types import QuestionServiceType

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
