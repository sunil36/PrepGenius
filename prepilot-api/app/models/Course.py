from datetime import datetime, timezone
from sqlalchemy.orm import relationship
from sqlalchemy import (
    Boolean,
    DateTime,
    Enum,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column
from app.db.database import Base
from app.schemas.course import SubscriptionType


class Course(Base):
    __tablename__ = "category"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
        autoincrement=True,
    )

    course_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    slug: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    icon_class: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    display_order: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    subscription_type: Mapped[SubscriptionType] = mapped_column(
        Enum(SubscriptionType),
        nullable=False,
    )

    active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    updated_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
        onupdate=lambda: datetime.now(timezone.utc),
    )

    deleted_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    technology_stacks = relationship(
        "TechnologyStackClass",
        back_populates="category",
    )