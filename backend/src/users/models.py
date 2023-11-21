import datetime

from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import func, DateTime, String
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from users.employees import Employee
from users.enums import UserRoles
from users.schemas import UserRead
from users.tutors import Tutor


class User(SQLAlchemyBaseUserTableUUID, BaseModel):
    __tablename__ = "users"

    username: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    role: Mapped[UserRoles] = mapped_column(
        postgresql.ENUM(UserRoles, name="user_roles"), nullable=False, default=UserRoles.Employee)
    registered_at: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=func.now())

    employee: Mapped["Employee"] = relationship(lazy='selectin')
    tutor: Mapped["Tutor"] = relationship(lazy='selectin')

    def to_read_schema(self) -> UserRead:
        return UserRead(username=self.username,
                        role=self.role,
                        registered_at=self.registered_at,
                        id=self.id,
                        email=self.email,
                        is_active=self.is_active,
                        is_superuser=self.is_superuser,
                        is_verified=self.is_verified)
