from uuid import UUID

from pydantic import BaseModel, ConfigDict


class __ModuleBase(BaseModel):
    title: str
    previous_module_id: UUID | None
    next_module_id: UUID | None

    model_config = ConfigDict(from_attributes=True)


class ModuleRead(__ModuleBase):
    map_id: UUID
    id: UUID
    levels_ids: list[UUID]


class ModuleCreate(__ModuleBase):
    pass


class ModuleUpdate(__ModuleBase):
    map_id: UUID | None
    title: str | None
    previous_module_id: UUID | None
    next_module_id: UUID | None
