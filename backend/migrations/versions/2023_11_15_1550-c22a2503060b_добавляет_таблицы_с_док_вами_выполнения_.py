"""Добавляет таблицы с док-вами выполнения задания

Revision ID: c22a2503060b
Revises: 9f5fe0dc8217
Create Date: 2023-11-15 15:50:56.707333

"""
from typing import Sequence, Union

import sqlalchemy_utils
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c22a2503060b'
down_revision: Union[str, None] = '9f5fe0dc8217'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('image_proofs',
    sa.Column('proof_id', sa.UUID(), nullable=False),
    sa.Column('image_url', sqlalchemy_utils.types.url.URLType(), nullable=False),
    sa.PrimaryKeyConstraint('proof_id', 'image_url')
    )
    op.create_table('proofs',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('task_id', sa.UUID(), nullable=False),
    sa.Column('employee_id', sa.UUID(), nullable=False),
    sa.Column('message', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('video_proofs',
    sa.Column('proof_id', sa.UUID(), nullable=False),
    sa.Column('video_url', sqlalchemy_utils.types.url.URLType(), nullable=False),
    sa.PrimaryKeyConstraint('proof_id', 'video_url')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('video_proofs')
    op.drop_table('proofs')
    op.drop_table('image_proofs')
    # ### end Alembic commands ###
