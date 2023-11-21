from uuid import UUID

from fastapi import APIRouter

from users.employees.schemas import EmployeeRead
from users.enums import UserRoles
from users.schemas import UserRead, UserUpdate
from users.tutors.schemas import TutorRead
from utils.types import UserServiceType, EmployeeServiceType, TutorServiceType, CurrentUser

router = APIRouter(tags=["User"])


@router.get("/users/", tags=["Dev"])
async def root(user_service: UserServiceType) -> list[UserRead]:
    return await user_service.get_all()


@router.get("/users/{id}/")
async def get_user(id: UUID,
                   user_service: UserServiceType) -> UserRead:
    return await user_service.get_one(id)


@router.get("/users/me")
async def get_my_profile(user_service: UserServiceType,
                         employee_service: EmployeeServiceType,
                         tutor_service: TutorServiceType,
                         user: CurrentUser) -> UserRead | EmployeeRead | TutorRead:
    match user.role:
        case UserRoles.Employee:
            return await employee_service.get_one(user.employee.id)
        case UserRoles.Tutor:
            return await tutor_service.get_one(user.tutor.id)
        case _:
            return await user_service.get_one(user.id)


@router.delete("/users/{id}/")
async def delete_user(id: UUID,
                      user_service: UserServiceType) -> UserRead:
    return await user_service.delete_one(id)


@router.patch("/users/{id}/")
async def update_user(id: UUID,
                      user_update: UserUpdate,
                      user_service: UserServiceType) -> UserRead:
    return await user_service.update_one(id, user_update)
