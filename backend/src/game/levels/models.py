from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from game.modules.models import Module


class Level(BaseModel):
    __tablename__ = 'levels'

    name: Mapped[str] = mapped_column(String(length=255), nullable=False, primary_key=True)
    is_accomplished: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    module: Mapped[Module] = relationship(back_populates='level')
