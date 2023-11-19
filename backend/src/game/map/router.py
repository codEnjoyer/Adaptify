from uuid import UUID

from fastapi import APIRouter

from game.map.schemas import MapRead, MapCreate, MapUpdate
from utils.types import MapServiceType

router = APIRouter(prefix="/maps", tags=["Map"])


@router.get("/")
async def get_maps(map_service: MapServiceType) -> list[MapRead]:
    return await map_service.get_all()


@router.get("/{id}/")
async def get_map(id: UUID,
                  map_service: MapServiceType) -> MapRead:
    return await map_service.get_one(id)


@router.post("/")
async def post_map(map_create: MapCreate,
                   map_service: MapServiceType) -> UUID:
    return await map_service.create_one(map_create)


@router.delete("/{id}/")
async def delete_map(id: UUID,
                     map_service: MapServiceType) -> MapRead:
    return await map_service.delete_one(id)


@router.patch("/{id}/")
async def update_map(id: UUID,
                     map_update: MapUpdate,
                     map_service: MapServiceType) -> MapRead:
    return await map_service.update_one(id, map_update)
