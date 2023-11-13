from uuid import UUID

from pydantic import BaseModel, ConfigDict


class __ModuleBase(BaseModel):
    previous_module_id: UUID
    next_module_id: UUID
    name: str

    model_config = ConfigDict(from_attributes=True)


class ModuleRead(__ModuleBase):
    id: UUID


class ModuleCreate(__ModuleBase):
    pass


class ModuleUpdate(__ModuleBase):
    previous_module_id: UUID | None
    next_module_id: UUID | None
    name: str | None
