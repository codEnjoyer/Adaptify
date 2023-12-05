from uuid import UUID

from pydantic import BaseModel, ConfigDict

from game.units.tasks.questions.answers.schemas import AnswerOptionRead, AnswerOptionCreate, EmployeeAnswerPost, \
    EmployeeAnswerRead
from game.units.tasks.questions.enums import QuestionTypes


class __QuestionBase(BaseModel):
    type: QuestionTypes
    question: str

    model_config = ConfigDict(from_attributes=True)


class QuestionRead(__QuestionBase):
    id: UUID
    task_id: UUID
    answer_options: list[AnswerOptionRead]


class QuestionCreate(__QuestionBase):
    type: QuestionTypes = QuestionTypes.SingleChoice
    answer_options: list[AnswerOptionCreate]


class QuestionUpdate(__QuestionBase):
    type: QuestionTypes | None = None
    question: str | None = None
    answer_options: list[AnswerOptionCreate] | None = None


class EmployeeQuestionPost(__QuestionBase):
    id: UUID
    answers: list[EmployeeAnswerPost]


class EmployeeQuestionRead(__QuestionBase):
    results: list[EmployeeAnswerRead]
