from uuid import UUID

from pydantic import BaseModel, EmailStr, ConfigDict


class TutorRead(BaseModel):
    id: UUID
    name: str
    last_name: str
    email: EmailStr

    model_config = ConfigDict(from_attributes=True)
