
from datetime import datetime
from typing import Optional
from sqlalchemy.orm import relationship
from app.models.Course import Course

from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    Enum,
    ForeignKey,
    Integer,
    String,
    Text,
    text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.database import Base


class TechnologyStackClass(Base):
    __tablename__ = "technology_stack"
    __table_args__ = {"schema": "preppilot"}

    id: Mapped[int] = mapped_column(
        BigInteger, primary_key=True, autoincrement=True
    )

    category_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey(
            "category.id",
            onupdate="CASCADE",
            ondelete="RESTRICT",
        ),
        nullable=False,
    )

    subscription_type: Mapped[str] = mapped_column(
        Enum("free", "premium", name="subscription_type_enum"),
        nullable=False,
        server_default=text("'free'"),
    )

    technology_name: Mapped[str] = mapped_column(
        String(255), nullable=False
    )

    slug: Mapped[str] = mapped_column(
        String(255), nullable=False, unique=True
    )

    description: Mapped[Optional[str]] = mapped_column(
        Text, nullable=True
    )

    difficulty_level: Mapped[str] = mapped_column(
        Enum(
            "beginner",
            "intermediate",
            "advanced",
            "all",
            name="difficulty_level_enum",
        ),
        nullable=False,
        server_default=text("'all'"),
    )

    icon_class: Mapped[Optional[str]] = mapped_column(
        String(100), nullable=True
    )

    display_order: Mapped[int] = mapped_column(
        Integer, nullable=False, server_default=text("1")
    )

    active: Mapped[bool] = mapped_column(
        Boolean, nullable=False, server_default=text("1")
    )

    created_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime, nullable=True, server_default=text("CURRENT_TIMESTAMP")
    )

    updated_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime,
        nullable=True,
        server_default=text("CURRENT_TIMESTAMP"),
        onupdate=datetime.utcnow,
    )

    deleted_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime, nullable=True
    )

    # Relationship to the Category model
    category = relationship("Course", back_populates="technology_stacks")
