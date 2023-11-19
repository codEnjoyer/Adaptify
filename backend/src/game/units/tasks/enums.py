from enum import Enum, auto


class TaskTypes(Enum):
    Test = auto()


class TaskStates(Enum):
    NotViewed = auto()
    Viewed = auto()
    Submitted = auto()
    Finished = auto()
