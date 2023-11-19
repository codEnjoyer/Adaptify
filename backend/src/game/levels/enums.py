from enum import auto, Enum


class LevelStates(Enum):
    NotViewed = auto()
    Viewed = auto()
    Completed = auto()
