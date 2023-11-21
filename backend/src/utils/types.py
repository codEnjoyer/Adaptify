from typing import Annotated

from fastapi import Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from auth.base_config import current_user, current_superuser
from database import get_async_session
from game.dependencies import map_service, module_service, level_service, task_unit_service, theory_unit_service, \
    question_service
from services.employee_service import EmployeeService
from services.level_service import LevelService
from services.map_service import MapService
from services.module_service import ModuleService
from services.question_service import QuestionService
from services.task_unit_service import TaskUnitService
from services.theory_unit_service import TheoryUnitService
from services.tutor_service import TutorService
from services.user_service import UserService
from users.dependencies import employee_service, tutor_service, user_service
from users.models import User

CurrentUser = Annotated[User, Depends(current_user)]
CurrentSuperuser = Annotated[User, Depends(current_superuser)]

MapServiceType = Annotated[MapService, Depends(map_service)]
ModuleServiceType = Annotated[ModuleService, Depends(module_service)]
LevelServiceType = Annotated[LevelService, Depends(level_service)]
TaskUnitServiceType = Annotated[TaskUnitService, Depends(task_unit_service)]
TheoryUnitServiceType = Annotated[TheoryUnitService, Depends(theory_unit_service)]
QuestionServiceType = Annotated[QuestionService, Depends(question_service)]

UserServiceType = Annotated[UserService, Depends(user_service)]
EmployeeServiceType = Annotated[EmployeeService, Depends(employee_service)]
TutorServiceType = Annotated[TutorService, Depends(tutor_service)]

# AsyncDBSession = Annotated[AsyncSession, Depends(get_async_session)]
# QueryDBLimit = Annotated[int, Query(ge=0, le=10 ** 3)]
# QueryDBOffset = Annotated[int, Query(ge=0, le=10 ** 6)]
