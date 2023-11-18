from uuid import UUID

from pydantic import BaseModel, ConfigDict


class __ModuleBase(BaseModel):
    map_id: UUID
    title: str
    previous_module_id: UUID | None
    next_module_id: UUID | None

    model_config = ConfigDict(from_attributes=True)


class ModuleRead(__ModuleBase):
    id: UUID
    levels_id: list[UUID]


class ModuleCreate(__ModuleBase):
    pass


class ModuleUpdate(__ModuleBase):
    title: str | None = None
    previous_module_id: UUID | None = None
    next_module_id: UUID | None = None
