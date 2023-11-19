from uuid import UUID

from fastapi import APIRouter

from game.levels.schemas import LevelRead, LevelCreate, LevelUpdate
from utils.types import LevelServiceType

router = APIRouter(prefix="/levels", tags=["Levels"])


@router.get("/")
async def root(level_service: LevelServiceType) -> list[LevelRead]:
    return await level_service.get_all()


@router.get("/{id}")
async def get_level(id: UUID,
                    level_service: LevelServiceType) -> LevelRead:
    return await level_service.get_one(id)


@router.post("/")
async def post_level(level_create: LevelCreate,
                     level_service: LevelServiceType) -> LevelRead:
    return await level_service.create_one(level_create)


@router.delete("/{id}")
async def delete_level(id: UUID,
                       level_service: LevelServiceType) -> LevelRead:
    return await level_service.delete_one(id)


@router.patch("/{id}")
async def update_level(id: UUID,
                       level_update: LevelUpdate,
                       level_service: LevelServiceType) -> LevelRead:
    return await level_service.update_one(id, level_update)
