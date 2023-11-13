from uuid import UUID

from pydantic import BaseModel, ConfigDict


class __MapBase(BaseModel):
    name: str

    model_config = ConfigDict(from_attributes=True)


class MapRead(__MapBase):
    id: UUID


class MapCreate(__MapBase):
    pass


class MapUpdate(__MapBase):
    name: str | None
