import uuid

from pydantic import EmailStr
from sqlalchemy import UUID, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from users.employees.models import Employee


class Tutor(BaseModel):
    __tablename__ = "tutors"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(length=255), nullable=False)
    last_name: Mapped[str] = mapped_column(String(length=255), nullable=False)
    email: Mapped[EmailStr] = mapped_column(String(length=255), nullable=False, unique=True)

    employees: Mapped[list[Employee]] = relationship(back_populates='tutor')
