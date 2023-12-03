import uuid

from game.modules.schemas import ModuleRead, ModuleCreate, ModuleUpdate
from repository.abstract import AbstractRepository


class ModuleService:
    __module_repo: AbstractRepository

    def __init__(self, repository: type[AbstractRepository]):
        self.__module_repo = repository()

    async def create_one(self, schema_create: ModuleCreate) -> ModuleRead:
        schema_dict = schema_create.model_dump()
        return await self.__module_repo.add_one(schema_dict)

    async def get_all(self) -> list[ModuleRead]:
        models = await self.__module_repo.find_all()
        return [model.to_read_schema() for model in models]

    async def get_one(self, id: uuid.UUID) -> ModuleRead:
        res = await self.__module_repo.get_one(id)
        return res.to_read_schema()

    async def delete_one(self, id: uuid.UUID) -> ModuleRead:
        res = await self.__module_repo.delete_one(id)
        return res.to_read_schema()

    async def update_one(self, id: uuid.UUID, schema_update: ModuleUpdate) -> ModuleRead:
        schema_dict = schema_update.model_dump()
        res = await self.__module_repo.update_one(id, schema_dict)
        return res.to_read_schema()
