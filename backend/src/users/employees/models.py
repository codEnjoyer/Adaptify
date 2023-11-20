import typing
import uuid
import datetime

from sqlalchemy import UUID, String, Date, func, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from game.units.tasks import TaskUnit
from game.levels import Level
from users.employees.schemas import EmployeeRead

if typing.TYPE_CHECKING:
    from users import User
    from users.tutors import Tutor


class Employee(BaseModel):
    __tablename__ = "employees"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('users.id'), nullable=False)
    tutor_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('tutors.id'), nullable=False)
    name: Mapped[str] = mapped_column(String(length=255), nullable=False)
    last_name: Mapped[str] = mapped_column(String(length=255), nullable=False)
    hired_at: Mapped[datetime.date] = mapped_column(Date, server_default=func.current_date())

    user: Mapped["User"] = relationship()
    tutor: Mapped["Tutor"] = relationship(back_populates='employee')

    # tasks: Mapped[list["TaskUnit"]] = relationship(secondary="task_employees", back_populates='employees')
    # levels: Mapped[list["Level"]] = relationship(secondary="level_employees", back_populates='employees')

    def to_read_schema(self) -> EmployeeRead:
        return EmployeeRead(id=self.id,
                            user_id=self.user_id,
                            tutor_id=self.tutor_id,
                            name=self.name,
                            last_name=self.last_name,
                            hired_at=self.hired_at,
                            )
