import uuid

from game.map.schemas import MapCreate, MapRead, MapUpdate
from repository.abstract import AbstractRepository


class MapService:
    __map_repo: AbstractRepository

    def __init__(self, repository: type[AbstractRepository]):
        self.__map_repo = repository()

    async def create_one(self, schema_create: MapCreate) -> MapRead:
        schema_dict = schema_create.model_dump()
        return await self.__map_repo.add_one(schema_dict)

    async def get_all(self) -> list[MapRead]:
        models = await self.__map_repo.find_all()
        return [model.to_read_schema() for model in models]

    async def get_one(self, id: uuid.UUID) -> MapRead:
        res = await self.__map_repo.get_one(id)
        return res.to_read_schema()

    async def delete_one(self, id: uuid.UUID) -> MapRead:
        res = await self.__map_repo.delete_one(id)
        return res.to_read_schema()

    async def update_one(self, id: uuid.UUID, schema_update: MapUpdate) -> MapRead:
        schema_dict = schema_update.model_dump()
        res = await self.__map_repo.update_one(id, schema_dict)
        return res.to_read_schema()
