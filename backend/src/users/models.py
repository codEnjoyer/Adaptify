from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import Enum
from sqlalchemy.orm import Mapped, mapped_column

from database import BaseModel
from roles import UserRoles


class User(SQLAlchemyBaseUserTableUUID, BaseModel):
    role: Mapped[UserRoles] = mapped_column(Enum, nullable=False, default=UserRoles.Employee)
