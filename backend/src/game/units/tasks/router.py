from uuid import UUID

from fastapi import APIRouter

from game.units.tasks.schemas import TaskRead, TaskCreate, TaskUpdate

router = APIRouter(prefix="/tasks", tags=["Task"])


@router.get("/")
async def root() -> list[TaskRead]:
    return []


@router.get("/{id}")
async def get_task(id: UUID) -> TaskRead:
    return TaskRead()


@router.post("/")
async def post_task(task_create: TaskCreate) -> TaskRead:
    return TaskRead()


@router.delete("/{id}")
async def delete_task(id: UUID) -> TaskRead:
    return TaskRead()


@router.patch("/{id}")
async def update_task(id: UUID,
                      task_update: TaskUpdate) -> TaskRead:
    return TaskRead()
