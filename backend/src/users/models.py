import datetime

from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import func, DateTime, String
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import Mapped, mapped_column

from database import BaseModel
from users.enums import UserRoles
from users.schemas import UserRead


class User(SQLAlchemyBaseUserTableUUID, BaseModel):
    __tablename__ = "users"

    username: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    role: Mapped[UserRoles] = mapped_column(
        postgresql.ENUM(UserRoles, name="user_roles"), nullable=False, default=UserRoles.Employee)
    registered_at: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=func.now())

    def to_read_schema(self) -> UserRead:
        return UserRead(username=self.username,
                        role=self.role,
                        registered_at=self.registered_at,
                        id=self.id,
                        email=self.email,
                        is_active=self.is_active,
                        is_superuser=self.is_superuser,
                        is_verified=self.is_verified)
