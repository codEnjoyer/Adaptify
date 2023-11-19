"""обновляет модели задачи, вопросов и ответов

Revision ID: e545a099be25
Revises: 4e3cf7a2acb2
Create Date: 2023-11-19 22:20:11.830596

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e545a099be25'
down_revision: Union[str, None] = '4e3cf7a2acb2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('answers', sa.Column('is_correct', sa.Boolean(), nullable=False))
    op.alter_column('tasks', 'level_id',
               existing_type=sa.UUID(),
               nullable=False)
    op.add_column('theory_blocks', sa.Column('level_id', sa.UUID(), nullable=False))
    op.create_foreign_key(None, 'theory_blocks', 'levels', ['level_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'theory_blocks', type_='foreignkey')
    op.drop_column('theory_blocks', 'level_id')
    op.alter_column('tasks', 'level_id',
               existing_type=sa.UUID(),
               nullable=True)
    op.drop_column('answers', 'is_correct')
    # ### end Alembic commands ###
