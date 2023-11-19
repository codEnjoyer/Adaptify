from uuid import UUID

from pydantic import BaseModel


class __AnswerBase(BaseModel):
    answer: str


class AnswerOptionRead(__AnswerBase):
    question_id: UUID


class AnswerOptionCreate(__AnswerBase):
    pass


class AnswerOptionUpdate(__AnswerBase):
    answer: str | None = None
    question_id: UUID | None = None
