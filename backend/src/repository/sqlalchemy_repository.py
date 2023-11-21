import typing
import uuid

from sqlalchemy import insert, select, delete, update

from database import async_session_maker
from repository.abstract import AbstractRepository


class SQLAlchemyRepository(AbstractRepository):
    model = None

    async def add_one(self, model: dict[str, typing.Any]) -> model:
        async with async_session_maker() as session:
            stmt = insert(self.model).values(**model).returning(self.model)
            res = await session.execute(stmt)
            await session.commit()
            return res.scalar_one()

    async def find_all(self) -> list[model]:
        async with async_session_maker() as session:
            stmt = select(self.model)
            res = await session.execute(stmt)
            return res.scalars()

    async def get_one(self, id: uuid.UUID) -> model:
        async with async_session_maker() as session:
            stmt = select(self.model).where(self.model.id == id)
            res = await session.execute(stmt)
            return res.scalar_one()

    async def delete_one(self, id: uuid.UUID) -> model:
        async with async_session_maker() as session:
            stmt = delete(self.model).where(self.model.id == id).returning(self.model)
            res = await session.execute(stmt)
            await session.commit()
            return res.scalar_one()

    async def update_one(self, id: uuid.UUID, model: dict[str, typing.Any]) -> model:
        model = {key: value for key, value in model.items() if value}
        async with async_session_maker() as session:
            stmt = update(self.model).where(self.model.id == id).values(**model).returning(self.model)
            res = await session.execute(stmt)
            await session.commit()
            return res.scalar_one()
