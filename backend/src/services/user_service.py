import uuid

from users.schemas import UserRead, UserCreate, UserUpdate
from repository.abstract import AbstractRepository


class UserService:
    __tutor_repo: AbstractRepository

    def __init__(self, repository: type[AbstractRepository]):
        self.__tutor_repo = repository()

    async def create_one(self, schema_create: UserCreate) -> UserRead:
        schema_dict = schema_create.model_dump()
        return await self.__tutor_repo.add_one(schema_dict)

    async def get_all(self) -> list[UserRead]:
        models = await self.__tutor_repo.find_all()
        return [model.to_read_schema() for model in models]

    async def get_one(self, id: uuid.UUID) -> UserRead:
        res = await self.__tutor_repo.get_one(id)
        return res.to_read_schema()

    async def delete_one(self, id: uuid.UUID) -> UserRead:
        res = await self.__tutor_repo.delete_one(id)
        return res.to_read_schema()

    async def update_one(self, id: uuid.UUID, schema_update: UserUpdate) -> UserRead:
        schema_dict = schema_update.model_dump()
        res = await self.__tutor_repo.update_one(id, schema_dict)
        return res.to_read_schema()
