import typing
import uuid
import datetime

from pydantic import EmailStr
from sqlalchemy import UUID, String, Date, func, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel

if typing.TYPE_CHECKING:
    from users.tutors.models import Tutor
    from game.units.tasks.models import TaskUnit


class Employee(BaseModel):
    __tablename__ = "employees"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    tutor_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('tutors.id'), nullable=False)
    name: Mapped[str] = mapped_column(String(length=255), nullable=False)
    last_name: Mapped[str] = mapped_column(String(length=255), nullable=False)
    email: Mapped[EmailStr] = mapped_column(String(length=255), nullable=False, unique=True)
    hired_at: Mapped[datetime.date] = mapped_column(Date, server_default=func.current_date())

    tutor: Mapped["Tutor"] = relationship(back_populates='employee')
    tasks: Mapped[list["TaskUnit"]] = relationship(secondary="task_employees", back_populates='employees')
