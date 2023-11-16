import uuid
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from game.units.tasks.questions.models import QuestionTypes


class __QuestionBase(BaseModel):
    type: QuestionTypes
    question: str
    possible_answers: list[str]

    model_config = ConfigDict(from_attributes=True)

# TODO QuestionRead, QuestionCreate, QuestionUpdate
