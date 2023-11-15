import uuid
from typing import TYPE_CHECKING

from sqlalchemy import UUID, Text, String, URL, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy_utils import URLType

from database import BaseModel

if TYPE_CHECKING:
    from game.levels.models import Level


class TheoryUnit(BaseModel):
    __tablename__ = 'theory_blocks'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    theme: Mapped[str] = mapped_column(String, nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False, default="Текст теории")

    # videos: Mapped[list["TheoryVideo"]] = relationship(back_populates="theory_block")
    level: Mapped[list["Level"]] = relationship(secondary="level_theory_blocks")


class TheoryVideo(BaseModel):
    __tablename__ = 'theory_videos'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    theory_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey('theory_blocks.id'), nullable=False)
    url: Mapped[URL] = mapped_column(URLType, nullable=False)

    theory: Mapped["TheoryUnit"] = relationship(back_populates="theory_video")
