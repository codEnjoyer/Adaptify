import uuid

from game.units.tasks.questions.schemas import TestQuestionRead, TestQuestionCreate, TestQuestionUpdate
from repository.abstract import AbstractRepository


class QuestionService:
    __question_repo: AbstractRepository

    def __init__(self, repository: type[AbstractRepository]):
        self.__question_repo = repository()

    async def create_one(self, task_id: uuid.UUID, schema_create: TestQuestionCreate) -> TestQuestionRead:
        schema_dict = schema_create.model_dump(include={'type', 'answer_options', 'question'})
        schema_dict['task_id'] = task_id
        return await self.__question_repo.add_one(schema_dict)

    async def get_all(self) -> list[TestQuestionRead]:
        models = await self.__question_repo.find_all()
        return [model.to_read_schema() for model in models]

    async def get_one(self, id: uuid.UUID) -> TestQuestionRead:
        res = await self.__question_repo.get_one(id)
        return res.to_read_schema()

    async def delete_one(self, id: uuid.UUID) -> TestQuestionRead:
        res = await self.__question_repo.delete_one(id)
        return res.to_read_schema()

    async def update_one(self, id: uuid.UUID, schema_update: TestQuestionUpdate) -> TestQuestionRead:
        schema_dict = schema_update.model_dump()
        res = await self.__question_repo.update_one(id, schema_dict)
        return res.to_read_schema()
