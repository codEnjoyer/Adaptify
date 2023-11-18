from uuid import UUID

from fastapi import APIRouter

from game.units.tasks.schemas import TaskUnitRead, TaskUnitCreate, TaskUnitUpdate

router = APIRouter(prefix="/tasks", tags=["Task"])


@router.get("/")
async def root() -> list[TaskUnitRead]:
    return []


@router.get("/{id}")
async def get_task(id: UUID) -> TaskUnitRead:
    return TaskUnitRead()


@router.post("/")
async def post_task(task_create: TaskUnitCreate) -> TaskUnitRead:
    return TaskUnitRead()


@router.delete("/{id}")
async def delete_task(id: UUID) -> TaskUnitRead:
    return TaskUnitRead()


@router.patch("/{id}")
async def update_task(id: UUID,
                      task_update: TaskUnitUpdate) -> TaskUnitRead:
    return TaskUnitRead()
