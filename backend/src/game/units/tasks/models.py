import uuid
from typing import TYPE_CHECKING

from sqlalchemy import UUID, Integer, ForeignKey, Boolean
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from .enums import TaskTypes, TaskStates
from .schemas import TaskUnitRead

if TYPE_CHECKING:
    from game.levels.models import Level
    from questions.models import Question


class TaskUnit(BaseModel):
    __tablename__ = 'tasks'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    type: Mapped[TaskTypes] = mapped_column(postgresql.ENUM(TaskTypes, name='task_types'), nullable=False,
                                            default=TaskTypes.Test)
    level_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('levels.id'), default=uuid.uuid4, nullable=True)
    requires_review: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    score_reward: Mapped[int] = mapped_column(Integer, nullable=False, default=1)

    questions: Mapped[list["Question"]] = relationship(back_populates='task')
    level: Mapped[list["Level"]] = relationship(secondary="level_tasks", back_populates='task_units')

    def to_read_schema(self) -> TaskUnitRead:
        return TaskUnitRead(id=self.id,
                            type=self.type,
                            requires_review=self.requires_review,
                            score_reward=self.score_reward)


class EmployeesTask(BaseModel):
    __tablename__ = 'task_employees'

    task_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('tasks.id'), primary_key=True)
    employee_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('employees.id'), primary_key=True)
    state: Mapped[TaskStates] = mapped_column(postgresql.ENUM(TaskStates, name='task_states'), nullable=False,
                                              default=TaskStates.NotViewed)
