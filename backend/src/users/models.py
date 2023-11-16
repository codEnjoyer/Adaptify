import datetime

from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import func, DateTime, String
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import Mapped, mapped_column

from database import BaseModel
from users.roles import UserRoles


class User(SQLAlchemyBaseUserTableUUID, BaseModel):
    __tablename__ = "users"

    username: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    role: Mapped[UserRoles] = mapped_column(
        postgresql.ENUM(UserRoles, name="user_roles"), nullable=False, default=UserRoles.Employee)
    registered_at: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=func.now())
