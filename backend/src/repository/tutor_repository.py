from repository.sqlalchemy_repository import SQLAlchemyRepository
from users.tutors import Tutor


class TutorRepository(SQLAlchemyRepository):
    model = Tutor
