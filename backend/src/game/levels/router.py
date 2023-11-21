from uuid import UUID

from fastapi import APIRouter

from game.levels.schemas import LevelRead, LevelCreate, LevelUpdate
from utils.types import LevelServiceType

router = APIRouter(tags=["Levels"])


@router.get("/levels/", tags=['Dev'])
async def root(level_service: LevelServiceType) -> list[LevelRead]:
    return await level_service.get_all()


@router.get("/maps/{map_id}/modules/{module_id}/levels/")
async def get_module_levels(map_id: UUID,
                            module_id: UUID,
                            level_service: LevelServiceType) -> list[LevelRead]:
    return await level_service.get_all()


@router.get("/maps/{map_id}/modules/{module_id}/levels/{level_id}/")
async def get_module_level(map_id: UUID,
                           module_id: UUID,
                           level_id: UUID,
                           level_service: LevelServiceType) -> LevelRead:
    return await level_service.get_one(level_id)


@router.post("/maps/{map_id}/modules/{module_id}/levels/")
async def post_level_to_module(map_id: UUID,
                               module_id: UUID,
                               level_create: LevelCreate,
                               level_service: LevelServiceType) -> LevelRead:
    return await level_service.create_one(level_create)


@router.delete("/maps/{map_id}/modules/{module_id}/levels/{level_id}/")
async def delete_level_from_module(map_id: UUID,
                                   module_id: UUID,
                                   level_id: UUID,
                                   level_service: LevelServiceType) -> LevelRead:
    return await level_service.delete_one(level_id)


@router.patch("/maps/{map_id}/modules/{module_id}/levels/{level_id}/")
async def update_level_in_module(map_id: UUID,
                                 module_id: UUID,
                                 level_id: UUID,
                                 level_update: LevelUpdate,
                                 level_service: LevelServiceType) -> LevelRead:
    return await level_service.update_one(level_id, level_update)
