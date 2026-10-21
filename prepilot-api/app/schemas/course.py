from datetime import datetime,timezone
from enum import Enum
from pydantic import BaseModel,ConfigDict,Field
class SubscriptionType(str,Enum):
     FREE="free"
     PREMIUM = "premium"

class CreateCourse(BaseModel):
   model_config= ConfigDict(extra="forbid",str_strip_whitespace=True)
   course_name:str =Field(min_length=1,max_length=255)
   slug:str
   description:str | None=None
   icon_class:str | None=None
   display_order:int
   subscription_type:SubscriptionType
   active:bool
   created_at:datetime=Field(default_factory=lambda:datetime.now(timezone.utc))
   deleted_at:datetime | None=None
   updated_at:None=None

