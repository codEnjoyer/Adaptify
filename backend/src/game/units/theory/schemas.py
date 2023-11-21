from uuid import UUID

from pydantic import BaseModel, ConfigDict
from pydantic_core import Url


# region Theory
class __TheoryUnitBase(BaseModel):
    title: str
    content: str

    model_config = ConfigDict(from_attributes=True)


class TheoryUnitRead(__TheoryUnitBase):
    id: UUID


class TheoryUnitCreate(__TheoryUnitBase):
    pass


class TheoryUnitUpdate(__TheoryUnitBase):
    title: str | None = None
    content: str | None = None


# endregion

# class __TheoryVideoBase(BaseModel):
#     theory_id: UUID
#     url: Url
#
#     model_config = ConfigDict(from_attributes=True)
#
#
# class TheoryVideoRead(__TheoryVideoBase):
#     id: UUID
#
#
# class TheoryVideoCreate(__TheoryVideoBase):
#     pass
#
#
# class TheoryVideoUpdate(__TheoryVideoBase):
#     theory_id: UUID | None
#     url: Url | None
