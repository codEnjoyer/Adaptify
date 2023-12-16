import datetime as dt
from uuid import UUID

from pydantic import BaseModel, EmailStr, ConfigDict

from users.schemas import UserRead


class __EmployeeBase(BaseModel):
    tutor_id: UUID
    name: str
    last_name: str
    hired_at: dt.date
    patronymic: str
    coins: int

    model_config = ConfigDict(from_attributes=True)


class EmployeeRead(__EmployeeBase):
    id: UUID
    user: UserRead


class EmployeeCreate(__EmployeeBase):
    user_id: UUID


class EmployeeUpdate(__EmployeeBase):
    tutor_id: UUID | None = None
    name: str | None = None
    last_name: str | None = None
    patronymic: str | None = None
    hired_at: dt.date | None = None
    coins: int | None = None
