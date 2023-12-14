from enum import StrEnum, auto


class TaskTypes(StrEnum):
    Test = auto()
    Discussion = auto()


class TaskStates(StrEnum):
    NotViewed = auto()
    Viewed = auto()
    Submitted = auto()
    Finished = auto()
