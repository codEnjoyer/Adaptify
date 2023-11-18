from uuid import UUID

from fastapi import APIRouter

from users.tutors.schemas import TutorRead

router = APIRouter(prefix="/tutors", tags=["Tutor", "User"])


@router.get("/")
async def root() -> list[TutorRead]:
    return []


@router.get("/{id}")
async def get_tutor(id: UUID) -> TutorRead:
    return TutorRead()


@router.delete("/{id}")
async def delete_tutor(id: UUID) -> TutorRead:
    return TutorRead()
