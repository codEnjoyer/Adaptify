from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import BaseModel
from game.levels.models import Level


class Module(BaseModel):
    __tablename__ = 'modules'

    name: Mapped[str] = mapped_column(String(length=255), nullable=False, primary_key=True)

    levels: Mapped[list[Level]] = relationship(back_populates='module')
    previous_module: Mapped["Module"] = relationship(back_populates='next_module')
    next_module: Mapped["Module"] = relationship(back_populates='previous_module')
