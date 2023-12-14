from uuid import UUID

from pydantic import BaseModel, ConfigDict


class __AnswerBase(BaseModel):
    answer: str

    model_config = ConfigDict(from_attributes=True)


class AnswerOptionRead(__AnswerBase):
    id: UUID
    question_id: UUID


class AnswerOptionCreate(__AnswerBase):
    is_correct: bool


class AnswerOptionUpdate(__AnswerBase):
    answer: str | None = None
    is_correct: bool | None = None


class EmployeeAnswerPost(__AnswerBase):
    id: UUID
    is_selected: bool


class EmployeeAnswerRead(__AnswerBase):
    was_selected_correct: bool
