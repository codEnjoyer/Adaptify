from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import Enum
from sqlalchemy.orm import Mapped, mapped_column

from database import BaseModel
from users.roles import UserRoles


class User(SQLAlchemyBaseUserTableUUID, BaseModel):
    __tablename__ = "users"

    role: Mapped[UserRoles] = mapped_column(Enum(name='user_roles'), nullable=False, default=UserRoles.Employee)
