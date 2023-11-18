import uuid
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from game.modules.schemas import ModuleRead


class __MapBase(BaseModel):
    title: str

    model_config = ConfigDict(from_attributes=True)


class MapRead(__MapBase):
    id: UUID
    modules_ids: list[UUID]


class MapCreate(__MapBase):
    pass


class MapUpdate(__MapBase):
    title: str | None = None
