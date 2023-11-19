import uuid

from game.units.theory.schemas import TheoryUnitRead, TheoryUnitCreate, TheoryUnitUpdate
from repository.abstract import AbstractRepository


class TheoryUnitService:
    __theory_unit_repo: AbstractRepository

    def __init__(self, map_repo: type[AbstractRepository]):
        self.__theory_unit_repo = map_repo()

    async def create_one(self, level_id: uuid.UUID, schema_create: TheoryUnitCreate) -> TheoryUnitRead:
        schema_dict = schema_create.model_dump()
        schema_dict['level_id'] = level_id
        return await self.__theory_unit_repo.add_one(schema_dict)

    async def get_all(self) -> list[TheoryUnitRead]:
        models = await self.__theory_unit_repo.find_all()
        return [model.to_read_schema() for model in models]

    async def get_one(self, id: uuid.UUID) -> TheoryUnitRead:
        res = await self.__theory_unit_repo.get_one(id)
        return res.to_read_schema()

    async def delete_one(self, id: uuid.UUID) -> TheoryUnitRead:
        res = await self.__theory_unit_repo.delete_one(id)
        return res.to_read_schema()

    async def update_one(self, id: uuid.UUID, schema_update: TheoryUnitUpdate) -> TheoryUnitRead:
        schema_dict = schema_update.model_dump()
        res = await self.__theory_unit_repo.update_one(id, schema_dict)
        return res.to_read_schema()
