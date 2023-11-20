from repository.sqlalchemy_repository import SQLAlchemyRepository
from users import User


class UserRepository(SQLAlchemyRepository):
    model = User
