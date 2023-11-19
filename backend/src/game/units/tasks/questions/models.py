import uuid
from typing import TYPE_CHECKING

from sqlalchemy import UUID, String, ForeignKey
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from game.units.tasks.questions.enums import QuestionTypes
from game.units.tasks.questions.schemas import QuestionRead

if TYPE_CHECKING:
    from game.units.tasks import TaskUnit
    from game.units.tasks.questions.answers import AnswerOption


class Question(BaseModel):
    __tablename__ = 'questions'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    task_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('tasks.id'), default=uuid.uuid4, nullable=True)
    type: Mapped[QuestionTypes] = mapped_column(
        postgresql.ENUM(QuestionTypes, name='question_types'), nullable=False, default=QuestionTypes.SingleChoice)
    question: Mapped[str] = mapped_column(String, nullable=False, default="Вопрос!")
    correct_answer_id: Mapped[uuid.UUID] = mapped_column(UUID, default=uuid.uuid4)

    task: Mapped["TaskUnit"] = relationship(back_populates='questions')
    possible_answers: Mapped[list["AnswerOption"]] = relationship(back_populates='question', lazy='selectin')

    def to_read_schema(self) -> QuestionRead:
        return QuestionRead(id=self.id,
                            task_id=self.task_id,
                            question=self.question,
                            possible_answers=self.possible_answers)
