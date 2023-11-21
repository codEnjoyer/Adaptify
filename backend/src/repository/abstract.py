import typing
import uuid
from abc import ABC, abstractmethod


class AbstractRepository(ABC):
    @abstractmethod
    async def add_one(self, model: dict[str, typing.Any]):
        pass

    @abstractmethod
    async def find_all(self):
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
