from uuid import UUID

from pydantic import BaseModel, ConfigDict

from game.units.tasks.questions.schemas import QuestionRead
from game.units.tasks.enums import TaskTypes


class __TaskUnitBase(BaseModel):
    type: TaskTypes
    score_reward: int
    requires_review: bool

    model_config = ConfigDict(from_attributes=True)


class TaskUnitRead(__TaskUnitBase):
    questions: list[QuestionRead]
    level_id: UUID
    id: UUID


class TaskUnitCreate(__TaskUnitBase):
    type: TaskTypes = TaskTypes.Test
    score_reward: int = 1
    requires_review: bool = False


class TaskUnitUpdate(__TaskUnitBase):
    type: TaskTypes | None = None
    score_reward: int | None = None
    requires_review: bool | None = None
