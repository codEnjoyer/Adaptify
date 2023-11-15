import uuid
import enum
from typing import TYPE_CHECKING

from sqlalchemy import UUID, Integer, Text, Enum, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel

if TYPE_CHECKING:
    from game.levels.models import Level
    from questions.models import Question


class TaskTypes(enum.Enum):
    Test = enum.auto()


class TaskStates(enum.Enum):
    NotViewed = enum.auto()
    Viewed = enum.auto()
    Submitted = enum.auto()
    Finished = enum.auto()


class TaskUnit(BaseModel):
    __tablename__ = 'tasks'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    type: Mapped[TaskTypes] = mapped_column(Enum(name='task_types'), nullable=False, default=TaskTypes.Test)
    requires_review: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    score_reward: Mapped[int] = mapped_column(Integer, nullable=False, default=1)

    questions: Mapped[list["Question"]] = relationship()
    level: Mapped[list["Level"]] = relationship(secondary="level_tasks")


class EmployeesTask(BaseModel):
    __tablename__ = 'task_employees'

    task_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('tasks.id'), primary_key=True)
    employee_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('employees.id'), primary_key=True)
    state: Mapped[TaskStates] = mapped_column(Enum(name='task_states'), nullable=False, default=TaskStates.NotViewed)

# class Proof(BaseModel):
#     __tablename__ = "proofs"
#
#     content: Mapped[list[URL]] = mapped_column()
#
#     user: Mapped[User] = relationship(back_populates="proof")
#     task: Mapped[Task] = relationship(back_populates="proof")
