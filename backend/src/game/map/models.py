import typing
import uuid

from sqlalchemy import String, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel

if typing.TYPE_CHECKING:
    from game.modules.models import Module


class Map(BaseModel):
    __tablename__ = "maps"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(length=255), nullable=False)

    modules: Mapped[list["Module"]] = relationship(back_populates='map')