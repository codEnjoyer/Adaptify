from uuid import UUID

from fastapi import APIRouter

from game.units.tasks.questions.schemas import QuestionRead, QuestionCreate, QuestionUpdate

router = APIRouter(tags=["Questions"])


@router.get('/questions/', tags=["Dev"])
async def root() -> list[QuestionRead]:
    return []


@router.post('/maps/{map_id}/modules/{module_id}/levels/{level_id}/tasks/{task_id}/')
async def post_question_to_task_unit(map_id: UUID,
                                     module_id: UUID,
                                     level_id: UUID,
                                     task_id: UUID,
                                     question_create: QuestionCreate) -> QuestionRead:
    return QuestionRead()


@router.delete("/maps/{map_id}/modules/{module_id}/levels/{level_id}/tasks/{task_id}/questions/{question_id}/")
async def delete_question_from_task_unit(map_id: UUID,
                                         module_id: UUID,
                                         level_id: UUID,
                                         task_id: UUID,
                                         question_id: UUID) -> QuestionRead:
    return QuestionRead()


@router.patch("/maps/{map_id}/modules/{module_id}/levels/{level_id}/tasks/{task_id}/questions/{question_id}/")
async def update_question_in_task_unit(map_id: UUID,
                                       module_id: UUID,
                                       level_id: UUID,
                                       task_id: UUID,
                                       question_id: UUID,
                                       question_update: QuestionUpdate) -> QuestionRead:
    return QuestionRead()
