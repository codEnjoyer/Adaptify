import uuid

from game.map.schemas import MapCreate, MapRead, MapUpdate
from repository.abstract import AbstractRepository


class MapService:
    __map_repo: AbstractRepository

    def __init__(self, map_repo: type[AbstractRepository]):
        self.__map_repo = map_repo()

    async def create_one(self, map_create: MapCreate) -> uuid.UUID:
        map_dict = map_create.model_dump()
        map_id = await self.__map_repo.add_one(map_dict)
        return map_id

    async def get_all(self) -> list[MapRead]:
        maps = await self.__map_repo.find_all()
        return [map_model.to_read_schema() for map_model in maps]

    async def get_one(self, id: uuid.UUID) -> MapRead:
        res = await self.__map_repo.get_one(id)
        return res.to_read_schema()

    async def delete_one(self, id: uuid.UUID) -> MapRead:
        res = await self.__map_repo.delete_one(id)
        return res.to_read_schema()

    async def update_one(self, id: uuid.UUID, map_update: MapUpdate) -> MapRead:
        map_dict = map_update.model_dump()
        res = await self.__map_repo.update_one(id, map_dict)
        return res.to_read_schema()
