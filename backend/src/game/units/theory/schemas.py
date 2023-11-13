from uuid import UUID

from pydantic import BaseModel, ConfigDict
from pydantic_core import Url


# region Theory
class __TheoryBase(BaseModel):
    theme: str
    content: str

    model_config = ConfigDict(from_attributes=True)


class TheoryRead(__TheoryBase):
    id: UUID


class TheoryCreate(__TheoryBase):
    pass


class TheoryUpdate(__TheoryBase):
    theme: str | None
    content: str | None


# endregion

class __TheoryVideoBase(BaseModel):
    theory_id: UUID
    url: Url

    model_config = ConfigDict(from_attributes=True)


class TheoryVideoRead(__TheoryVideoBase):
    id: UUID


class TheoryVideoCreate(__TheoryVideoBase):
    pass


class TheoryVideoUpdate(__TheoryVideoBase):
    theory_id: UUID | None
    url: Url | None
