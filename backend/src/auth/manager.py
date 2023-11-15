import uuid

from fastapi_users import BaseUserManager, IntegerIDMixin

from users.models import User


# TODO: Добавить свой функционал по необходимости
# https://fastapi-users.github.io/fastapi-users/12.1/configuration/user-manager/
class UserManager(IntegerIDMixin, BaseUserManager[User, uuid.UUID]):
    pass
