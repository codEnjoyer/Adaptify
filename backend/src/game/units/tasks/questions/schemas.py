from uuid import UUID

from pydantic import BaseModel, ConfigDict

from game.units.tasks.questions.answers.schemas import AnswerOptionRead, AnswerOptionCreate, EmployeeAnswerPost, \
    EmployeeAnswerRead
from game.units.tasks.questions.enums import QuestionTypes


# region Base

class __QuestionBase(BaseModel):
    type: QuestionTypes
    question: str

    model_config = ConfigDict(from_attributes=True)


class __QuestionReadBase(__QuestionBase):
    id: UUID
    task_id: UUID


class __QuestionCreateBase(__QuestionBase):
    pass


class __QuestionUpdateBase(__QuestionBase):
    type: QuestionTypes | None
    question: str | None


class __EmployeeQuestionPostBase(__QuestionBase):
    id: UUID


# endregion Base
# region Test

class TestQuestionRead(__QuestionReadBase):
    answer_options: list[AnswerOptionRead]


class TestQuestionCreate(__QuestionCreateBase):
    type: QuestionTypes = QuestionTypes.SingleChoice
    answer_options: list[AnswerOptionCreate]


class TestQuestionUpdate(__QuestionUpdateBase):
    answer_options: list[AnswerOptionCreate] | None


class EmployeeTestQuestionPost(__EmployeeQuestionPostBase):
    id: UUID
    answers: list[EmployeeAnswerPost]


class EmployeeTestQuestionRead(__QuestionReadBase):
    results: list[EmployeeAnswerRead]


# endregion Test
# region Open

class OpenQuestionRead(__QuestionReadBase):
    pass


class OpenQuestionCreate(__QuestionCreateBase):
    type: QuestionTypes = QuestionTypes.Open


class OpenQuestionUpdate(__QuestionUpdateBase):
    pass


class EmployeeOpenQuestionPost(__EmployeeQuestionPostBase):
    answer: str

# endregion Open
