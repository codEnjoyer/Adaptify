import uuid

from game.units.tasks.schemas import TaskUnitCreate, TaskUnitRead, TaskUnitUpdate
from repository.abstract import AbstractRepository


class EmployeeTaskService:
    __employee_task_repo: AbstractRepository

    def __init__(self, repository: type[AbstractRepository]):
        self.__employee_task_repo = repository()

    async def create_one(self, level_id: uuid.UUID, schema_create: TaskUnitCreate) -> TaskUnitRead:
        schema_dict = schema_create.model_dump()
        schema_dict['level_id'] = level_id
        return await self.__employee_task_repo.add_one(schema_dict)

    async def get_one(self, id: uuid.UUID) -> TaskUnitRead:
        res = await self.__employee_task_repo.get_one(id)
        return res.to_read_schema()

    async def delete_one(self, id: uuid.UUID) -> TaskUnitRead:
        res = await self.__employee_task_repo.delete_one(id)
        return res.to_read_schema()

    async def update_one(self, id: uuid.UUID, schema_update: TaskUnitUpdate) -> TaskUnitRead:
        schema_dict = schema_update.model_dump()
        res = await self.__employee_task_repo.update_one(id, schema_dict)
        return res.to_read_schema()
