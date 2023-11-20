import datetime as dt
from uuid import UUID

from pydantic import BaseModel, EmailStr, ConfigDict


class __EmployeeBase(BaseModel):
    user_id: UUID
    tutor_id: UUID
    name: str
    last_name: str
    hired_at: dt.date

    model_config = ConfigDict(from_attributes=True)


class EmployeeRead(__EmployeeBase):
    id: UUID


class EmployeeCreate(__EmployeeBase):
    pass


class EmployeeUpdate(__EmployeeBase):
    user_id: UUID | None = None
    tutor_id: UUID | None = None
    name: str | None = None
    last_name: str | None = None
    hired_at: dt.date | None = None
