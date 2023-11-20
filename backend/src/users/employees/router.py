from uuid import UUID

from fastapi import APIRouter

from users.employees.schemas import EmployeeRead, EmployeeUpdate
from utils.types import EmployeeServiceType

router = APIRouter(tags=["Employee", "User"])


@router.get("/employees/", tags=["Dev"])
async def root(employee_service: EmployeeServiceType) -> list[EmployeeRead]:
    return await employee_service.get_all()


@router.get("/employees/{id}/")
async def get_employee(id: UUID,
                       employee_service: EmployeeServiceType) -> EmployeeRead:
    return await employee_service.get_one(id)


@router.delete("/employees/{id}/")
async def delete_employee(id: UUID,
                          employee_service: EmployeeServiceType) -> EmployeeRead:
    return await employee_service.delete_one(id)


@router.patch("/employees/{id}/")
async def update_employee(id: UUID,
                          employee_update: EmployeeUpdate,
                          employee_service: EmployeeServiceType) -> EmployeeRead:
    return await employee_service.update_one(id, employee_update)
