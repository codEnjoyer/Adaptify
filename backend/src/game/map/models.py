from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from game.modules.models import Module


class Map(BaseModel):
    __tablename__ = "maps"

    name: Mapped[str] = mapped_column(String(length=255), nullable=False, primary_key=True)

    modules: Mapped[list[Module]] = relationship(back_populates='map')