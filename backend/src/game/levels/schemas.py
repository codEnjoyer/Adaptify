from uuid import UUID

from pydantic import BaseModel, ConfigDict


class __LevelBase(BaseModel):
    module_id: UUID
    title: str
    theory_units_id: list[UUID] | None
    task_units_id: list[UUID] | None

    model_config = ConfigDict(from_attributes=True)


class LevelRead(__LevelBase):
    id: UUID
    theory_units_id: list[UUID]
    task_units_id: list[UUID]


class LevelCreate(__LevelBase):
    pass


class LevelUpdate(__LevelBase):
    module_id: UUID | None = None
    title: str | None = None
    theory_units_id: list[UUID] | None = None
    task_units_id: list[UUID] | None = None
