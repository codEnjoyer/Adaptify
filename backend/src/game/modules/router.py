from uuid import UUID

from fastapi import APIRouter, HTTPException, status
from sqlalchemy.exc import NoResultFound

from game.modules.schemas import ModuleRead, ModuleCreate, ModuleUpdate
from utils.types import ModuleServiceType

router = APIRouter(tags=["Level"])


@router.get("/modules/", tags=["Dev"])
async def root(module_service: ModuleServiceType) -> list[ModuleRead]:
    return await module_service.get_all()


@router.get("/maps/{map_id}/modules/")
async def get_map_modules(map_id: UUID,
                          module_service: ModuleServiceType) -> list[ModuleRead]:
    return await module_service.get_all()


@router.get("/maps/{map_id}/modules/{module_id}/")
async def get_map_module(map_id: UUID,
                         module_id: UUID,
                         module_service: ModuleServiceType) -> ModuleRead:
    return await module_service.get_one(module_id)


@router.post("/maps/{map_id}/modules/")
async def post_module_to_map(map_id: UUID,
                             module_create: ModuleCreate,
                             module_service: ModuleServiceType) -> ModuleRead:
    return await module_service.create_one(module_create)


@router.delete("/maps/{map_id}/modules/{module_id}/")
async def delete_module_from_map(map_id: UUID,
                                 module_id: UUID,
                                 module_service: ModuleServiceType) -> ModuleRead:
    # TODO: Добавить обработку ошибок
    # try:
    #     deleted_module =
    # except NoResultFound as exc:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=exc.args)
    return await module_service.delete_one(module_id)


@router.patch("/maps/{map_id}/modules/{module_id}/")
async def update_module_on_map(map_id: UUID,
                               module_id: UUID,
                               module_update: ModuleUpdate,
                               module_service: ModuleServiceType) -> ModuleRead:
    return await module_service.update_one(module_id, module_update)
