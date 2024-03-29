"""добавляет отчество для сотрудника

Revision ID: e3d254cf74f4
Revises: 2f3cf6083f65
Create Date: 2023-12-05 23:10:14.243329

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e3d254cf74f4'
down_revision: Union[str, None] = '2f3cf6083f65'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('employees', sa.Column('patronymic', sa.String(length=255), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('employees', 'patronymic')
    # ### end Alembic commands ###
