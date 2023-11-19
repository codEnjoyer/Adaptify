from uuid import UUID

from pydantic import BaseModel, ConfigDict

from game.units.tasks.questions.schemas import QuestionRead, QuestionCreate, QuestionUpdate
from game.units.tasks.enums import TaskTypes


class __TaskUnitBase(BaseModel):
    # questions: list[QuestionRead]
    type: TaskTypes
    score_reward: int
    requires_review: bool

    model_config = ConfigDict(from_attributes=True)


class TaskUnitRead(__TaskUnitBase):
    id: UUID


class TaskUnitCreate(__TaskUnitBase):
    questions: list[QuestionCreate]


class TaskUnitUpdate(__TaskUnitBase):
    questions: list[QuestionUpdate] | None = None
    type: TaskTypes | None = None
    score_reward: int | None = None
    requires_review: bool | None = None
