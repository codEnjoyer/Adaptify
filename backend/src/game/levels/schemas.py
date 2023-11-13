from uuid import UUID

from pydantic import BaseModel, ConfigDict


class __LevelBase(BaseModel):
    module_id: UUID
    name: str

    model_config = ConfigDict(from_attributes=True)


class LevelRead(__LevelBase):
    id: UUID
    is_accomplished: bool


class LevelCreate(__LevelBase):
    pass


class LevelUpdate(__LevelBase):
    module_id: UUID | None
    name: str | None
