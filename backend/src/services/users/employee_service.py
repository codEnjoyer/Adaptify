import uuid

from users.employees.schemas import EmployeeRead, EmployeeCreate, EmployeeUpdate
from repository.abstract import AbstractRepository


class EmployeeService:
    __employee_repo: AbstractRepository

    def __init__(self, repository: type[AbstractRepository]):
        self.__employee_repo = repository()

    async def create_one(self, schema_create: EmployeeCreate) -> EmployeeRead:
        schema_dict = schema_create.model_dump()
        return await self.__employee_repo.add_one(schema_dict)

    async def get_all(self) -> list[EmployeeRead]:
        models = await self.__employee_repo.find_all()
        return [model.to_read_schema() for model in models]

    async def get_one(self, id: uuid.UUID) -> EmployeeRead:
        res = await self.__employee_repo.get_one(id)
        return res.to_read_schema()

    async def delete_one(self, id: uuid.UUID) -> EmployeeRead:
        res = await self.__employee_repo.delete_one(id)
        return res.to_read_schema()

    async def update_one(self, id: uuid.UUID, schema_update: EmployeeUpdate) -> EmployeeRead:
        schema_dict = schema_update.model_dump()
        res = await self.__employee_repo.update_one(id, schema_dict)
        return res.to_read_schema()
