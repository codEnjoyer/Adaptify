from game.units.tasks.questions.answers import AnswerOption
from repository.sqlalchemy_repository import SQLAlchemyRepository


class AnswerOptionRepository(SQLAlchemyRepository):
    model = AnswerOption
