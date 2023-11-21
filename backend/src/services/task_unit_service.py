import uuid

from game.units.tasks.schemas import TaskUnitCreate, TaskUnitRead, TaskUnitUpdate
from repository.abstract import AbstractRepository


class TaskUnitService:
    __task_unit_repo: AbstractRepository

    def __init__(self, repository: type[AbstractRepository]):
        self.__task_unit_repo = repository()

    async def create_one(self, level_id: uuid.UUID, schema_create: TaskUnitCreate) -> TaskUnitRead:
        schema_dict = schema_create.model_dump()
        schema_dict['level_id'] = level_id
        return await self.__task_unit_repo.add_one(schema_dict)

    async def get_all(self) -> list[TaskUnitRead]:
        models = await self.__task_unit_repo.find_all()
        return [model.to_read_schema() for model in models]

    async def get_one(self, id: uuid.UUID) -> TaskUnitRead:
        res = await self.__task_unit_repo.get_one(id)
        return res.to_read_schema()

    async def delete_one(self, id: uuid.UUID) -> TaskUnitRead:
        res = await self.__task_unit_repo.delete_one(id)
        return res.to_read_schema()

    async def update_one(self, id: uuid.UUID, schema_update: TaskUnitUpdate) -> TaskUnitRead:
        schema_dict = schema_update.model_dump()
        res = await self.__task_unit_repo.update_one(id, schema_dict)
        return res.to_read_schema()
