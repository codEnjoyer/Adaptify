import uuid

from game.units.tasks.questions import Question
from game.units.tasks.questions.answers import AnswerOption
from repository.abstract import AbstractRepository


class AnswerOptionService:
    __answers_options_repo: AbstractRepository

    def __init__(self, repository: type[AbstractRepository]):
        self.__answers_options_repo = repository()

    async def get_all_correct(self, question_id: uuid.UUID) -> list[uuid.UUID]:
        correct_answers_models = await (self.__answers_options_repo
                                        .find_all_with_condition(Question.id == question_id,
                                                                 AnswerOption.is_correct.is_(True))
                                        )
        return [correct_answer.id for correct_answer in correct_answers_models]
