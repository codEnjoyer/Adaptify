from repository.game.level_repository import LevelRepository
from repository.game.map_repository import MapRepository
from repository.game.module_repository import ModuleRepository
from repository.game.units.question_repository import QuestionRepository
from repository.game.units.task_unit_repository import TaskUnitRepository
from repository.game.units.theory_unit_repository import TheoryUnitRepository
from services.game.level_service import LevelService
from services.game.map_service import MapService
from services.game.module_service import ModuleService
from services.game.units.question_service import QuestionService
from services.game.units.task_unit_service import TaskUnitService
from services.game.units.theory_unit_service import TheoryUnitService


def map_service() -> MapService:
    return MapService(MapRepository)


def module_service() -> ModuleService:
    return ModuleService(ModuleRepository)


def level_service() -> LevelService:
    return LevelService(LevelRepository)


def task_unit_service() -> TaskUnitService:
    return TaskUnitService(TaskUnitRepository)


def theory_unit_service() -> TheoryUnitService:
    return TheoryUnitService(TheoryUnitRepository)


def question_service() -> QuestionService:
    return QuestionService(QuestionRepository)
