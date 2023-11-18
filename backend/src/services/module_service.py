import uuid

from game.modules.schemas import ModuleRead, ModuleCreate, ModuleUpdate
from repository.abstract import AbstractRepository


class ModuleService:
    __module_repo: AbstractRepository

    def __init__(self, map_repo: type[AbstractRepository]):
        self.__module_repo = map_repo()

    async def create_one(self, module_create: ModuleCreate) -> ModuleRead:
        module_dict = module_create.model_dump()
        return await self.__module_repo.add_one(module_dict)

    async def get_all(self) -> list[ModuleRead]:
        models = await self.__module_repo.find_all()
        return [model.to_read_schema() for model in models]

    async def get_one(self, id: uuid.UUID) -> ModuleRead:
        res = await self.__module_repo.get_one(id)
        return res.to_read_schema()

    async def delete_one(self, id: uuid.UUID) -> ModuleRead:
        res = await self.__module_repo.delete_one(id)
        return res.to_read_schema()

    async def update_one(self, id: uuid.UUID, module_update: ModuleUpdate) -> ModuleRead:
        module_dict = module_update.model_dump()
        res = await self.__module_repo.update_one(id, module_dict)
        return res.to_read_schema()
