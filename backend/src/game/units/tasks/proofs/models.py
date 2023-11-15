import uuid

from sqlalchemy import UUID, Text, URL
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy_utils import URLType

from database import BaseModel


class Proof(BaseModel):
    __tablename__ = 'proofs'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    task_id: Mapped[uuid.UUID] = mapped_column(UUID, nullable=False)
    employee_id: Mapped[uuid.UUID] = mapped_column(UUID, nullable=False)
    message: Mapped[str] = mapped_column(Text)

    images: Mapped[list["ProofImages"]] = relationship()
    videos: Mapped[list["ProofVideos"]] = relationship()


class ProofImages(BaseModel):
    __tablename__ = "image_proofs"

    proof_id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    image_url: Mapped[URL] = mapped_column(URLType, primary_key=True)


class ProofVideos(BaseModel):
    __tablename__ = "video_proofs"

    proof_id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    video_url: Mapped[URL] = mapped_column(URLType, primary_key=True)
