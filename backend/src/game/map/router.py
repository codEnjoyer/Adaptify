from uuid import UUID

from fastapi import APIRouter

from game.map.schemas import MapRead, MapCreate, MapUpdate

router = APIRouter(prefix="/maps", tags=["Map"])


@router.get("/")
async def root() -> list[MapRead]:
    return []


@router.get("/{id}")
async def get_map(id: UUID) -> MapRead:
    return MapRead()


@router.post("/")
async def post_map(map_create: MapCreate) -> MapRead:
    return MapRead()


@router.delete("/{id}")
async def delete_map(id: UUID) -> MapRead:
    return MapRead()


@router.patch("/{id}")
async def update_map(id: UUID,
                     map_update: MapUpdate) -> MapRead:
    return MapRead()
