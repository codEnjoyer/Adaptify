from uuid import UUID

from fastapi import APIRouter

from users.schemas import UserRead, UserCreate, UserUpdate

router = APIRouter(prefix="/users", tags=["User"])


@router.get("/")
async def root() -> list[UserRead]:
    return []


@router.get("/{id}")
async def get_user(id: UUID) -> UserRead:
    return UserRead()


@router.post("/")
async def post_user(user_create: UserCreate) -> UserRead:
    return UserRead()


@router.delete("/{id}")
async def delete_user(id: UUID) -> UserRead:
    return UserRead()


@router.patch("/{id}")
async def update_user(id: UUID,
                      user_update: UserUpdate) -> UserRead:
    return UserRead()
