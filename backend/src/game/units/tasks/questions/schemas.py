from uuid import UUID

from pydantic import BaseModel, ConfigDict

from game.units.tasks.questions.models import QuestionTypes


# region Question
class __QuestionBase(BaseModel):
    task_id: UUID
    type: QuestionTypes
    question: str

    model_config = ConfigDict(from_attributes=True)


class QuestionRead(__QuestionBase):
    id: UUID
    possible_answers: list["AnswerRead"]


class QuestionCreate(__QuestionBase):
    correct_answer: "AnswerCreate"
    possible_answers: list["AnswerCreate"]


class QuestionUpdate(__QuestionBase):
    type: QuestionTypes | None = None
    question: str | None = None
    possible_answers: list["AnswerUpdate"] | None = None


# endregion Question

# region Answer
class __AnswerBase(BaseModel):
    content: str


class AnswerRead(__AnswerBase):
    question_id: UUID


class AnswerCreate(__AnswerBase):
    pass


class AnswerUpdate(__AnswerBase):
    content: str | None = None
    question_id: UUID | None = None
# endregion Answer
