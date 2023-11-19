from uuid import UUID

from fastapi import APIRouter

from game.units.tasks.schemas import TaskUnitRead, TaskUnitCreate, TaskUnitUpdate
from utils.types import TaskUnitServiceType

router = APIRouter(prefix="/tasks", tags=["Task"])


@router.get("/{id}")
async def get_task(id: UUID,
                   task_unit_service: TaskUnitServiceType) -> TaskUnitRead:
    return await task_unit_service.get_one(id)


@router.post("/level/{level_id}/")
async def post_task(level_id: UUID,
                    task_create: TaskUnitCreate,
                    task_unit_service: TaskUnitServiceType) -> TaskUnitRead:
    return await task_unit_service.create_one(level_id, task_create)


@router.delete("/{id}")
async def delete_task(id: UUID,
                      task_unit_service: TaskUnitServiceType) -> TaskUnitRead:
    return await task_unit_service.delete_one(id)


@router.patch("/{id}")
async def update_task(id: UUID,
                      task_update: TaskUnitUpdate,
                      task_unit_service: TaskUnitServiceType) -> TaskUnitRead:
    return await task_unit_service.update_one(id, task_update)
