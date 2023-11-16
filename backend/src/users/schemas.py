import uuid
from datetime import datetime
from typing import Annotated

from fastapi_users.schemas import BaseUserCreate, BaseUserUpdate, BaseUser
from pydantic import Field


class __CustomUser:
    username: Annotated[str, Field(min_length=3, max_length=50)]


class UserRead(BaseUser[uuid.UUID], __CustomUser):
    registered_at: Annotated[datetime, Field(default_factory=datetime.now)]


class UserCreate(BaseUserCreate, __CustomUser):
    pass


class UserUpdate(BaseUserUpdate, __CustomUser):
    username: Annotated[str | None, Field(min_length=3, max_length=50, default=None)]