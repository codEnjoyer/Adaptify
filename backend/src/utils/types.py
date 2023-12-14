from typing import Annotated

from fastapi import Depends

from auth.base_config import current_user, current_superuser
from game.dependencies import map_service, module_service, level_service, task_unit_service, theory_unit_service, \
    question_service, answer_option_service, employee_task_service
from services.game.units.answer_option_service import AnswerOptionService
from services.game.units.employee_task_service import EmployeeTaskService
from services.users.employee_service import EmployeeService
from services.game.level_service import LevelService
from services.game.map_service import MapService
from services.game.module_service import ModuleService
from services.game.units.question_service import QuestionService
from services.game.units.task_unit_service import TaskUnitService
from services.game.units.theory_unit_service import TheoryUnitService
from services.users.tutor_service import TutorService
from services.users.user_service import UserService
from users.dependencies import employee_service, tutor_service, user_service
from users.models import User

CurrentUser = Annotated[User, Depends(current_user)]
CurrentSuperuser = Annotated[User, Depends(current_superuser)]

MapServiceType = Annotated[MapService, Depends(map_service)]
ModuleServiceType = Annotated[ModuleService, Depends(module_service)]
LevelServiceType = Annotated[LevelService, Depends(level_service)]
TaskUnitServiceType = Annotated[TaskUnitService, Depends(task_unit_service)]
EmployeeTaskServiceType = Annotated[EmployeeTaskService, Depends(employee_task_service)]
TheoryUnitServiceType = Annotated[TheoryUnitService, Depends(theory_unit_service)]
QuestionServiceType = Annotated[QuestionService, Depends(question_service)]
AnswerOptionServiceType = Annotated[AnswerOptionService, Depends(answer_option_service)]

UserServiceType = Annotated[UserService, Depends(user_service)]
EmployeeServiceType = Annotated[EmployeeService, Depends(employee_service)]
TutorServiceType = Annotated[TutorService, Depends(tutor_service)]

# QueryDBLimit = Annotated[int, Query(ge=0, le=10 ** 3)]
# QueryDBOffset = Annotated[int, Query(ge=0, le=10 ** 6)]
