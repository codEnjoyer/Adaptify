import typing
import uuid

from sqlalchemy import insert

from database import async_session_maker
from game.units.tasks.questions import Question
from game.units.tasks.questions.answers import AnswerOption
from repository.sqlalchemy_repository import SQLAlchemyRepository


class QuestionRepository(SQLAlchemyRepository):
    model = Question

    async def add_one(self, model: dict[str, typing.Any]) -> Question:
        async with async_session_maker() as session:
            possible_answers_list = model.pop('possible_answers')
            question_to_add = Question(**model)

            possible_answers = [AnswerOption(**answer_option_dict, question_id=question_to_add.id) for
                                answer_option_dict in possible_answers_list]
            for answer_option in possible_answers:
                question_to_add.answer_options.append(answer_option)

            session.add(question_to_add)
            await session.commit()
            await session.refresh(question_to_add)
            return question_to_add
