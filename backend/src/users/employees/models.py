import uuid
from datetime import date

from pydantic import EmailStr
from sqlalchemy import UUID, String, Date, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from users.tutors.models import Tutor


class Employee(BaseModel):
    __tablename__ = "employees"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(length=255), nullable=False)
    last_name: Mapped[str] = mapped_column(String(length=255), nullable=False)
    email: Mapped[EmailStr] = mapped_column(String(length=255), nullable=False, unique=True)
    hired_at: Mapped[date] = mapped_column(Date, server_default=func.current_date())

    tutor: Mapped[Tutor] = relationship(back_populates='tutor')
