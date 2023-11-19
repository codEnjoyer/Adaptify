import uuid
import enum
from typing import TYPE_CHECKING

from sqlalchemy import UUID, Enum, String, ForeignKey
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel

if TYPE_CHECKING:
    from game.units.tasks.models import TaskUnit


class QuestionTypes(enum.Enum):
    SingleChoice = enum.auto()
    MultipleChoice = enum.auto()


class Question(BaseModel):
    __tablename__ = 'questions'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    task_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('tasks.id'), default=uuid.uuid4, nullable=True)
    type: Mapped[QuestionTypes] = mapped_column(
        postgresql.ENUM(QuestionTypes, name='question_types'), nullable=False, default=QuestionTypes.SingleChoice)
    question: Mapped[str] = mapped_column(String, nullable=False, default="Вопрос!")
    correct_answer_id: Mapped[uuid.UUID] = mapped_column(UUID, default=uuid.uuid4)

    task: Mapped["TaskUnit"] = relationship(back_populates='questions')
    possible_answers: Mapped[list["AnswerOption"]] = relationship(back_populates='question')
    correct_answers: Mapped[list["AnswerOption"]] = relationship(back_populates='question')


class AnswerOption(BaseModel):
    __tablename__ = 'answers'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    question_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('questions.id'), default=uuid.uuid4)
    content: Mapped[str] = mapped_column(String, nullable=False, default='Ответ?')

    question: Mapped["Question"] = relationship(back_populates='possible_answers')
