import uuid
import datetime

from fastapi_users.schemas import BaseUserCreate, BaseUserUpdate, BaseUser
from pydantic import EmailStr

from users.enums import UserRoles


class __CustomUser:
    pass


class UserRead(BaseUser[uuid.UUID], __CustomUser):
    id: uuid.UUID
    email: EmailStr
    role: UserRoles
    registered_at: datetime.datetime


class UserCreate(BaseUserCreate, __CustomUser):
    pass


class UserUpdate(UserCreate):
    email: EmailStr | None
    role: UserRoles | None
