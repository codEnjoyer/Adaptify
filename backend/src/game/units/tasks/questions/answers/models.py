import uuid
from typing import TYPE_CHECKING

from sqlalchemy import UUID, String, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from game.units.tasks.questions.answers.schemas import AnswerOptionRead

if TYPE_CHECKING:
    from game.units.tasks.questions import Question


class AnswerOption(BaseModel):
    __tablename__ = 'answer_options'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    question_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('questions.id'), default=uuid.uuid4)
    answer: Mapped[str] = mapped_column(String, nullable=False, default='Ответ?')
    is_correct: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    question: Mapped["Question"] = relationship(back_populates='answer_options', lazy='selectin')

    def to_read_schema(self) -> AnswerOptionRead:
        return AnswerOptionRead(id=self.id,
                                question_id=self.question_id,
                                answer=self.answer)
