from fastapi_users.db import SQLAlchemyBaseUserTableUUID

from database import BaseModel
from roles import UserRoles


class User(SQLAlchemyBaseUserTableUUID, BaseModel):
    role: UserRoles = UserRoles.Employee
