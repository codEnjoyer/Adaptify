from enum import Enum, auto, StrEnum


class TaskTypes(StrEnum):
    Test = auto()


class TaskStates(Enum):
    NotViewed = auto()
    Viewed = auto()
    Submitted = auto()
    Finished = auto()
