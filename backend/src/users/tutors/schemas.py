from uuid import UUID

from pydantic import BaseModel, EmailStr, ConfigDict

from users.schemas import UserRead


class __TutorBase(BaseModel):
    name: str
    last_name: str

    model_config = ConfigDict(from_attributes=True)


class TutorRead(__TutorBase):
    id: UUID
    user: UserRead


class TutorCreate(__TutorBase):
    user_id: UUID


class TutorUpdate(__TutorBase):
    name: str | None = None
    last_name: str | None = None
    user_id: UUID | None = None
