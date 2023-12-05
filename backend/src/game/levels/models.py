import typing
import uuid

from sqlalchemy import String, UUID, ForeignKey
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from game.levels.enums import LevelStates
from game.levels.schemas import LevelRead
from game.units import TaskUnit, TheoryUnit

if typing.TYPE_CHECKING:
    from game.modules.models import Module
    from game.units.tasks.models import TaskUnit
    from game.units.theory.models import TheoryUnit


class Level(BaseModel):
    __tablename__ = 'levels'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    module_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('modules.id', ondelete="CASCADE"))
    title: Mapped[str] = mapped_column(String(length=255), nullable=False)

    module: Mapped["Module"] = relationship(back_populates='levels')

    theory_units: Mapped[list["TheoryUnit"]] = relationship(
        back_populates='level', lazy='selectin', cascade='all, delete-orphan')

    task_units: Mapped[list["TaskUnit"]] = relationship(
        back_populates='level', lazy='selectin', cascade='all, delete-orphan')

    def to_read_schema(self) -> LevelRead:
        return LevelRead(id=self.id,
                         module_id=self.module_id,
                         title=self.title,
                         theory_units=[unit.to_read_schema() for unit in self.theory_units],
                         task_units=[unit.to_read_schema() for unit in self.task_units])


class EmployeesLevel(BaseModel):
    __tablename__ = 'level_employees'

    level_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('levels.id'), nullable=False, primary_key=True)
    employee_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('employees.id'), nullable=False, primary_key=True)
    state: Mapped[LevelStates] = mapped_column(
        postgresql.ENUM(LevelStates, name='level_states'), nullable=False, default=LevelStates.NotViewed)
