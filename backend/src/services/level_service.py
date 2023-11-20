import uuid

from game.levels.schemas import LevelRead, LevelCreate, LevelUpdate
from repository.abstract import AbstractRepository


class LevelService:
    __level_repo: AbstractRepository

    def __init__(self, repository: type[AbstractRepository]):
        self.__level_repo = repository()

    async def create_one(self, level_create: LevelCreate) -> LevelRead:
        level_dict = level_create.model_dump()
        return await self.__level_repo.add_one(level_dict)

    async def get_all(self) -> list[LevelRead]:
        models = await self.__level_repo.find_all()
        return [model.to_read_schema() for model in models]

    async def get_one(self, id: uuid.UUID) -> LevelRead:
        res = await self.__level_repo.get_one(id)
        return res.to_read_schema()

    async def delete_one(self, id: uuid.UUID) -> LevelRead:
        res = await self.__level_repo.delete_one(id)
        return res.to_read_schema()

    async def update_one(self, id: uuid.UUID, level_update: LevelUpdate) -> LevelRead:
        level_dict = level_update.model_dump()
        res = await self.__level_repo.update_one(id, level_dict)
        return res.to_read_schema()
