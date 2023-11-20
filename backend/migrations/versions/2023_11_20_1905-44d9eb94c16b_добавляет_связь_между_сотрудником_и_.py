"""добавляет связь между сотрудником и куратором и пользователем

Revision ID: 44d9eb94c16b
Revises: a2f543f8e4c6
Create Date: 2023-11-20 19:05:36.806797

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '44d9eb94c16b'
down_revision: Union[str, None] = 'a2f543f8e4c6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('employees', sa.Column('user_id', sa.UUID(), nullable=False))
    op.create_foreign_key(None, 'employees', 'users', ['user_id'], ['id'])
    op.add_column('tutors', sa.Column('user_id', sa.UUID(), nullable=False))
    op.create_foreign_key(None, 'tutors', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tutors', type_='foreignkey')
    op.drop_column('tutors', 'user_id')
    op.drop_constraint(None, 'employees', type_='foreignkey')
    op.drop_column('employees', 'user_id')
    # ### end Alembic commands ###
