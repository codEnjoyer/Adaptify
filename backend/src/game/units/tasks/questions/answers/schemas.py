from uuid import UUID

from pydantic import BaseModel


class __AnswerBase(BaseModel):
    answer: str


class AnswerOptionRead(__AnswerBase):
    id: UUID
    question_id: UUID


class AnswerOptionCreate(__AnswerBase):
    is_correct: bool


class AnswerOptionUpdate(__AnswerBase):
    answer: str | None = None
    is_correct: bool | None = None
