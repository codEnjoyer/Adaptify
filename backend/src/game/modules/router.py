from uuid import UUID

from fastapi import APIRouter, HTTPException, status
from sqlalchemy.exc import NoResultFound

from game.modules.schemas import ModuleRead, ModuleCreate, ModuleUpdate
from utils.types import ModuleServiceType

router = APIRouter(prefix="/modules", tags=["Module"])


@router.get("/")
async def root(module_service: ModuleServiceType) -> list[ModuleRead]:
    return await module_service.get_all()


@router.get("/{id}")
async def get_module(id: UUID,
                     module_service: ModuleServiceType) -> ModuleRead:
    return await module_service.get_one(id)


@router.post("/")
async def post_module(module_create: ModuleCreate,
                      module_service: ModuleServiceType) -> ModuleRead:
    return await module_service.create_one(module_create)


@router.delete("/{id}")
async def delete_module(id: UUID,
                        module_service: ModuleServiceType) -> ModuleRead:
    # TODO: Добавить обработку ошибок
    # try:
    #     deleted_module =
    # except NoResultFound as exc:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=exc.args)
    return await module_service.delete_one(id)


@router.patch("/{id}")
async def update_module(id: UUID,
                        module_update: ModuleUpdate,
                        module_service: ModuleServiceType) -> ModuleRead:
    return await module_service.update_one(id, module_update)
