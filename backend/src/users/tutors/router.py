from uuid import UUID

from fastapi import APIRouter

from users.tutors.schemas import TutorRead, TutorCreate, TutorUpdate
from utils.types import TutorServiceType

router = APIRouter(tags=["Tutor", "User"])


@router.get("/tutors/", tags=["Dev"])
async def root(tutor_service: TutorServiceType) -> list[TutorRead]:
    return await tutor_service.get_all()


@router.get("/tutors/{id}/")
async def get_tutor(id: UUID,
                    tutor_service: TutorServiceType) -> TutorRead:
    return await tutor_service.get_one(id)


@router.post("/tutors/")
async def post_tutor(id: UUID,
                     tutor_create: TutorCreate,
                     tutor_service: TutorServiceType) -> TutorRead:
    return await tutor_service.create_one(id, tutor_create)


@router.delete("/tutors/{id}/")
async def delete_tutor(id: UUID,
                       tutor_service: TutorServiceType) -> TutorRead:
    return await tutor_service.delete_one(id)


@router.patch("/tutors/{id}/")
async def update_tutor(id: UUID,
                       tutor_update: TutorUpdate,
                       tutor_service: TutorServiceType) -> TutorRead:
    return await tutor_service.update_one(id, tutor_update)
