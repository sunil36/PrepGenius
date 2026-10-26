from fastapi import HTTPException,status
from app.db.database import get_db
from fastapi import Depends
from fastapi import APIRouter
from app.schemas.technology_stack import TechnologyStack
from app.models.TechnologyStackModel import TechnologyStackClass

from sqlalchemy.orm import Session
router=APIRouter()
@router.post("/technology-stack")
def add_technology_stack(technology:TechnologyStack,db:Session=Depends(get_db)):
    try:
        check_slug=db.query(TechnologyStackClass).filter(TechnologyStackClass.slug==technology.slug).first()
        if check_slug:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
        addTechnology=TechnologyStackClass(**technology.model_dump())
        db.add(addTechnology)
        db.commit()
        db.refresh(addTechnology)
        return {
            "status":200,
            "data":{
                "id":addTechnology.id,
                **technology.model_dump()
            }
        }
    except Exception:
        db.rollback()
        raise HTTPException (status_code=500,
            detail="Failed to create course")


############Fetch Technology List API###################
# @router


