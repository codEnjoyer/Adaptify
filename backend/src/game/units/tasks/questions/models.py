import uuid
from typing import TYPE_CHECKING

from sqlalchemy import UUID, String, ForeignKey
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from game.units.tasks.questions.enums import QuestionTypes
from game.units.tasks.questions.schemas import TestQuestionRead

if TYPE_CHECKING:
    from game.units.tasks import TaskUnit
    from game.units.tasks.questions.answers import AnswerOption


class Question(BaseModel):
    __tablename__ = 'questions'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    task_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('task_units.id', ondelete="CASCADE"), default=uuid.uuid4, nullable=True)
    type: Mapped[QuestionTypes] = mapped_column(
        postgresql.ENUM(QuestionTypes, name='question_types'), nullable=False, default=QuestionTypes.SingleChoice)
    question: Mapped[str] = mapped_column(String, nullable=False, default="Вопрос!")

    task: Mapped["TaskUnit"] = relationship(back_populates='questions')
    answer_options: Mapped[list["AnswerOption"]] = relationship(
        back_populates='question', lazy='selectin', cascade='all, delete-orphan')

    def to_read_schema(self) -> TestQuestionRead:
        return TestQuestionRead(id=self.id,
                                type=self.type,
                                task_id=self.task_id,
                                question=self.question,
                                answer_options=[model.to_read_schema() for model in self.answer_options])
