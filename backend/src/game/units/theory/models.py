import uuid
from typing import TYPE_CHECKING

from sqlalchemy import UUID, Text, String, URL, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy_utils import URLType

from database import BaseModel
from game.units.theory.schemas import TheoryUnitRead

if TYPE_CHECKING:
    from game.levels.models import Level


class TheoryUnit(BaseModel):
    __tablename__ = 'theory_blocks'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String, nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False, default="Текст теории")
    level_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('levels.id'), default=uuid.uuid4)

    # videos: Mapped[list["TheoryVideo"]] = relationship(back_populates="theory_block")
    level: Mapped[list["Level"]] = relationship(secondary="level_theory_blocks", back_populates='theory_units')

    def to_read_model(self) -> TheoryUnitRead:
        return TheoryUnitRead(id=self.id,
                              title=self.title,
                              content=self.content)


# class TheoryVideo(BaseModel):
#     __tablename__ = 'theory_videos'
#
#     id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
#     theory_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('theory_blocks.id'), nullable=False)
#     url: Mapped[URL] = mapped_column(URLType, nullable=False)
#
#     theory: Mapped["TheoryUnit"] = relationship(back_populates="theory_video")
