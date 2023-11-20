from uuid import UUID

from pydantic import BaseModel, EmailStr, ConfigDict


class __TutorBase(BaseModel):
    name: str
    last_name: str

    model_config = ConfigDict(from_attributes=True)


class TutorRead(__TutorBase):
    id: UUID


class TutorCreate(__TutorBase):
    pass


class TutorUpdate(__TutorBase):
    name: str | None = None
    last_name: str | None = None
