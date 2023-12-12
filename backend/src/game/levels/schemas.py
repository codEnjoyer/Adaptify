from uuid import UUID

from pydantic import BaseModel, ConfigDict

from game.units.tasks.schemas import TestTaskUnitRead
from game.units.theory.schemas import TheoryUnitRead


class __LevelBase(BaseModel):
    title: str

    model_config = ConfigDict(from_attributes=True)


class LevelRead(__LevelBase):
    id: UUID
    module_id: UUID
    theory_units: list[TheoryUnitRead]
    task_units: list[TestTaskUnitRead]


class LevelCreate(__LevelBase):
    pass


class LevelUpdate(__LevelBase):
    title: str | None
    module_id: UUID | None
