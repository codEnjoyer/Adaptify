from uuid import UUID

from fastapi import APIRouter

from game.units.tasks.schemas import TestTaskUnitRead, TestTaskUnitCreate, TestTaskUnitUpdate, DiscussionTaskUnitCreate, \
    DiscussionTaskUnitRead, DiscussionTaskUnitUpdate
from utils.types import TaskUnitServiceType

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
