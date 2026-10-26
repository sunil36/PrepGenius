from tarfile import data_filter
from sqlalchemy import Boolean
from pydantic import Field
from enum import Enum
from pydantic.config import ConfigDict
from pydantic import BaseModel
from datetime import datetime,timezone
class SubscriptionType(str,Enum):
   FREE="free"
   PREMIUM = "premium"
class DefficultyLevel(str,Enum):
    BEGINNER="beginner"
    INTERMEDIATE="intermediate"
    ADVANCED="advanced"
    ALL="all"
class TechnologyStack(BaseModel):
    ConfigDict(extra="forbid",str_strip_whitespace=True)
    category_id:int
    subscription_type:SubscriptionType
    technology_name:str
    slug:str
    description:str
    difficulty_level:DefficultyLevel
    icon_class:str
    display_order:int
    active:bool
    created_at:datetime=Field(default_factory=lambda:datetime.now(timezone.utc))
    updated_at:datetime | None=None
    deleted_at:datetime | None=None

