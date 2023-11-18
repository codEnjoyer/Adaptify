from uuid import UUID

from fastapi import APIRouter

from game.modules.schemas import ModuleRead, ModuleCreate, ModuleUpdate

router = APIRouter(prefix="/modules", tags=["Module"])


@router.get("/")
async def root() -> list[ModuleRead]:
    return []


@router.get("/{id}")
async def get_module(id: UUID) -> ModuleRead:
    return ModuleRead()


@router.post("/")
async def post_module(module_create: ModuleCreate) -> ModuleRead:
    return ModuleRead()


@router.delete("/{id}")
async def delete_module(id: UUID) -> ModuleRead:
    return ModuleRead()


@router.patch("/{id}")
async def update_module(id: UUID,
                        module_update: ModuleUpdate) -> ModuleRead:
    return ModuleRead()
