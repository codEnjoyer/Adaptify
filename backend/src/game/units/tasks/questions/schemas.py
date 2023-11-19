from uuid import UUID

from pydantic import BaseModel, ConfigDict

from game.units.tasks.questions.answers.schemas import AnswerOptionRead, AnswerOptionCreate
from game.units.tasks.questions.enums import QuestionTypes


class __QuestionBase(BaseModel):
    task_id: UUID
    type: QuestionTypes
    question: str

    model_config = ConfigDict(from_attributes=True)


class QuestionRead(__QuestionBase):
    id: UUID
    possible_answers: list[AnswerOptionRead]


class QuestionCreate(__QuestionBase):
    correct_answer: AnswerOptionCreate
    possible_answers: list[AnswerOptionCreate]


class QuestionUpdate(__QuestionBase):
    type: QuestionTypes | None = None
    question: str | None = None
    possible_answers: list[AnswerOptionCreate] | None = None
