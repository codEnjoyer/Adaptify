import uuid
from typing import TYPE_CHECKING

from sqlalchemy import UUID, Integer, ForeignKey, Boolean, String
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from .enums import TaskTypes, TaskStates
from .schemas import TestTaskUnitRead

if TYPE_CHECKING:
    from game.levels.models import Level
    from questions.models import Question


class TaskUnit(BaseModel):
    __tablename__ = 'task_units'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    type: Mapped[TaskTypes] = mapped_column(postgresql.ENUM(TaskTypes, name='task_types'), nullable=False,
                                            default=TaskTypes.Test)
    level_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('levels.id', ondelete="CASCADE"), default=uuid.uuid4)
    requires_review: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    score_reward: Mapped[int] = mapped_column(Integer, nullable=False, default=1)

    questions: Mapped[list["Question"]] = relationship(
        back_populates='task', lazy='selectin', cascade='all, delete-orphan')
    level: Mapped[list["Level"]] = relationship(back_populates='task_units', lazy='selectin')

    def to_read_schema(self) -> TestTaskUnitRead:
        return TestTaskUnitRead(id=self.id,
                                level_id=self.level_id,
                                type=self.type,
                                requires_review=self.requires_review,
                                score_reward=self.score_reward,
                                questions=[model.to_read_schema() for model in self.questions])


class EmployeeTask(BaseModel):
    __tablename__ = 'task_employees'
    # TODO: Поменять task_id? Добавить поле? Таблицу? Не понятно, откуда брать ответы пользователя

    task_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('task_units.id'), primary_key=True)
    employee_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('employees.id'), primary_key=True)
    state: Mapped[TaskStates] = mapped_column(postgresql.ENUM(TaskStates, name='task_states'), nullable=False,
                                              default=TaskStates.NotViewed)
