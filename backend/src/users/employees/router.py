from uuid import UUID

from fastapi import APIRouter

from users.employees.schemas import EmployeeRead

router = APIRouter(prefix="/employees", tags=["Employee", "User"])


@router.get("/")
async def root() -> list[EmployeeRead]:
    return []


@router.get("/{id}")
async def get_employee(id: UUID) -> EmployeeRead:
    return EmployeeRead()


@router.delete("/{id}")
async def delete_employee(id: UUID) -> EmployeeRead:
    return EmployeeRead()
