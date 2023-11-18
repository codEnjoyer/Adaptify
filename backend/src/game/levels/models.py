import enum
import typing
import uuid

from sqlalchemy import String, Boolean, UUID, ForeignKey, Enum
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel

if typing.TYPE_CHECKING:
    from game.modules.models import Module
    from game.units.tasks.models import TaskUnit
    from game.units.theory.models import TheoryUnit


class LevelStates(enum.Enum):
    NotViewed = enum.auto()
    Viewed = enum.auto()
    Completed = enum.auto()


class Level(BaseModel):
    __tablename__ = 'levels'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    module_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('modules.id'), nullable=False)
    name: Mapped[str] = mapped_column(String(length=255), nullable=False)

    module: Mapped["Module"] = relationship(back_populates='levels')
    # theory: Mapped[list["TheoryUnit"]] = relationship(secondary="level_theory_blocks", back_populates='level')
    # tasks: Mapped[list["TaskUnit"]] = relationship(secondary="level_tasks", back_populates='level')


class EmployeesLevel(BaseModel):
    __tablename__ = 'level_employees'

    level_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('levels.id'), nullable=False, primary_key=True)
    employee_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('employees.id'), nullable=False, primary_key=True)
    state: Mapped[LevelStates] = mapped_column(
        postgresql.ENUM(LevelStates, name='level_states'), nullable=False, default=LevelStates.NotViewed)


class LevelTask(BaseModel):
    __tablename__ = "level_tasks"

    level_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('levels.id'), nullable=False, primary_key=True)
    task_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('tasks.id'), nullable=False, primary_key=True)


class LevelTheory(BaseModel):
    __tablename__ = "level_theory_blocks"

    level_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('levels.id'), nullable=False, primary_key=True)
    theory_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('theory_blocks.id'), nullable=False, primary_key=True)
