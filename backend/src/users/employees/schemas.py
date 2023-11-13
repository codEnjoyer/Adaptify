import datetime as dt
from uuid import UUID

from pydantic import BaseModel, EmailStr, ConfigDict


class EmployeeRead(BaseModel):
    id: UUID
    tutor_id: UUID
    name: str
    last_name: str
    email: EmailStr
    hired_at: dt.date

    model_config = ConfigDict(from_attributes=True)
