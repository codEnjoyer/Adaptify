import uuid
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from game.units.tasks.questions.models import QuestionTypes


class __QuestionBase(BaseModel):
    type: QuestionTypes
    question: str
    possible_answers: list[str]

    model_config = ConfigDict(from_attributes=True)


class TaskRead(__QuestionBase):
    id: UUID
    task_id: UUID


class TaskCreate(__QuestionBase):
    correct_answers: list[str]
    task_id: UUID


class TaskUpdate(__QuestionBase):
    question: str | None
    possible_answers: list[str] | None
    correct_answers: list[str] | None
