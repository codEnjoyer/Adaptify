from uuid import UUID

from fastapi import APIRouter

from users.schemas import UserRead, UserUpdate
from utils.types import UserServiceType

router = APIRouter(tags=["User"])


@router.get("/users/", tags=["Dev"])
async def root(user_service: UserServiceType) -> list[UserRead]:
    return await user_service.get_all()


@router.get("/users/{id}/")
async def get_user(id: UUID,
                   user_service: UserServiceType) -> UserRead:
    return await user_service.get_one(id)


@router.delete("/users/{id}/")
async def delete_user(id: UUID,
                      user_service: UserServiceType) -> UserRead:
    return await user_service.delete_one(id)


@router.patch("/{id}/")
async def update_user(id: UUID,
                      user_update: UserUpdate,
                      user_service: UserServiceType) -> UserRead:
    return await user_service.update_one(id, user_update)
