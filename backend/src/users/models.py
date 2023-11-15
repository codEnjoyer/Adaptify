import datetime

from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import Enum, func, DateTime, String
from sqlalchemy.orm import Mapped, mapped_column

from database import BaseModel
from users.roles import UserRoles


class User(SQLAlchemyBaseUserTableUUID, BaseModel):
    __tablename__ = "users"

    username: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    # role: Mapped[UserRoles] = mapped_column(Enum(name='user_roles'), nullable=False, default=UserRoles.EMPLOYEE)
    registered_at: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=func.now())
