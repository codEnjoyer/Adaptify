from game.units import TheoryUnit
from repository.sqlalchemy_repository import SQLAlchemyRepository


class TheoryUnitRepository(SQLAlchemyRepository):
    model = TheoryUnit
