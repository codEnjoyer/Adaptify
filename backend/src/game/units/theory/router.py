from uuid import UUID

from fastapi import APIRouter

from game.units.theory.schemas import (TheoryRead, TheoryCreate, TheoryUpdate,
                                       TheoryVideoRead, TheoryVideoCreate, TheoryVideoUpdate)

router = APIRouter(prefix="/theory", tags=["Theory"])


@router.get("/")
async def root() -> list[TheoryRead]:
    return []


@router.get("/{id}")
async def get_theory_block(id: UUID) -> TheoryRead:
    return TheoryRead()


@router.get("/videos/{id}")
async def get_theory_block_videos(id: UUID) -> list[TheoryVideoRead]:
    return []


@router.post("/")
async def post_theory_block(theory_create: TheoryCreate) -> TheoryRead:
    return TheoryRead()


@router.post("/videos/")
async def post_theory_block_video(theory_video_create: TheoryVideoCreate) -> TheoryVideoRead:
    return TheoryVideoRead()


@router.delete("/{id}")
async def delete_theory_block(id: UUID) -> TheoryRead:
    return TheoryRead()


@router.delete("/videos/{id}")
async def delete_theory_block_video(id: UUID) -> TheoryVideoRead:
    return TheoryVideoRead()


@router.patch("/{id}")
async def update_theory_block(id: UUID,
                              theory_update: TheoryUpdate) -> TheoryRead:
    return TheoryRead()


@router.patch("/videos/{id}")
async def update_theory_block_video(id: UUID,
                                    theory_video_update: TheoryVideoUpdate) -> TheoryVideoRead:
    return TheoryVideoRead()
