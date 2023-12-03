import typing
import uuid
from abc import ABC, abstractmethod

from sqlalchemy import ColumnElement
from sqlalchemy.sql._typing import _HasClauseElement
from sqlalchemy.sql.elements import SQLCoreOperations
from sqlalchemy.sql.roles import ExpressionElementRole


class AbstractRepository(ABC):
    @abstractmethod
    async def add_one(self, model: dict[str, typing.Any]):
        pass

    @abstractmethod
    async def find_all(self):
        pass

    @abstractmethod
    async def find_all_with_condition(self, *whereclause: ColumnElement[bool]):
        pass

    @abstractmethod
    async def get_one(self, id: uuid.UUID):
        pass

    @abstractmethod
    async def delete_one(self, id: uuid.UUID):
        pass

    @abstractmethod
    async def update_one(self, id: uuid.UUID, model: dict[str, typing.Any]):
        pass
