from uuid import UUID

from pydantic import BaseModel, ConfigDict


class __TaskBase(BaseModel):
    content: str
    score_reward: int

    model_config = ConfigDict(from_attributes=True)


class TaskRead(__TaskBase):
    id: UUID
    is_accomplished: bool


class TaskCreate(__TaskBase):
    pass


class TaskUpdate(__TaskBase):
    content: str | None
    score_reward: int | None
