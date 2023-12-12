from uuid import UUID

from pydantic import BaseModel, ConfigDict

from game.units.tasks.schemas import TestTaskUnitRead
from game.units.theory.schemas import TheoryUnitRead


class __LevelBase(BaseModel):
    module_id: UUID
    title: str

    model_config = ConfigDict(from_attributes=True)


class LevelRead(__LevelBase):
    id: UUID
    theory_units: list[TheoryUnitRead]
    task_units: list[TestTaskUnitRead]


class LevelCreate(__LevelBase):
    # theory_units: list[TheoryUnitRead] | None
    # task_units: list[TaskUnitRead] | None
    pass


class LevelUpdate(__LevelBase):
    module_id: UUID | None = None
    title: str | None = None
