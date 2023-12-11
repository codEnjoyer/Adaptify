from uuid import UUID

from pydantic import BaseModel, ConfigDict

from game.units.tasks.questions.schemas import TestQuestionRead
from game.units.tasks.enums import TaskTypes


# region Base
class __TaskUnitBase(BaseModel):
    type: TaskTypes
    score_reward: int
    requires_review: bool

    model_config = ConfigDict(from_attributes=True)


class __TaskUnitReadBase(__TaskUnitBase):
    id: UUID
    level_id: UUID


class __TaskUnitCreateBase(__TaskUnitBase):
    pass


class __TaskUnitUpdateBase(__TaskUnitBase):
    type: TaskTypes | None
    score_reward: int | None
    requires_review: bool | None


# endregion Base
# region Test
class TestTaskUnitCreate(__TaskUnitCreateBase):
    type: TaskTypes = TaskTypes.Test
    score_reward: int = 1
    requires_review: bool = False


class TestTaskUnitUpdate(__TaskUnitUpdateBase):
    pass


class TestTaskUnitRead(__TaskUnitReadBase):
    questions: list[TestQuestionRead]


# endregion Test
# region Discussion
class DiscussionTaskUnitRead(__TaskUnitReadBase):
    pass


class DiscussionTaskUnitCreate(__TaskUnitCreateBase):
    type: TaskTypes = TaskTypes.Discussion
    score_reward: int = 5
    requires_review: bool = True


class DiscussionTaskUnitUpdate(__TaskUnitUpdateBase):
    pass

# endregion Discussion
