from fastapi import status
from fastapi import APIRouter,Depends,HTTPException,status
from app.schemas.course import CreateCourse
from app.models.Course import Course
from sqlalchemy.orm import Session
from app.db.database import get_db
# Add category 
router=APIRouter()
@router.post("/add-course",status_code=status.HTTP_201_CREATED)
def add_course(course:CreateCourse,db:Session=Depends(get_db)):
    Course_exist=db.query(Course).filter(Course.slug==course.slug).first()
    if Course_exist :
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Course with slug '{course.slug}' already exists.")
    try:
        # Check if slug is alrady exit in db
       

        new_course= Course(**course.model_dump())
        db.add(new_course)
        db.commit()
        db.refresh(new_course)
        return {
            "status":200,
            "message":"Course added sucessfully.",
            "data":{
                "id":new_course.id,
                **course.model_dump()

            }
        }
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Failed to create course"
        )
# Fetch all list of API
@router.get("/categories")
def get_all_categories_list(db:Session=Depends(get_db)):
   get_all_list= db.query(Course).filter(Course.active==1 and Course.deleted_at.is_(None)).all()
   return {
    "status":200,
    "message":"All list fetch here",
    "data": get_all_list
   }
# edit category
@router.get("/category-editor")
def get_category_by_id(id:int,db:Session=Depends(get_db)):
    try:
        get_by_category=db.query(Course).filter(Course.id==id).first()
        if get_by_category:
                           return {
                            'status':200,
                            'message':"Retrive product",
                            'data':get_by_category
                            }
        else:
            return {
             'status':200,
             'message':"No product found by this request.",
             }
        
    except Exception :
        raise HTTPException (status_code=500,detail="Failed to create course")

# Update Category by Id
@router.put('/category')
def update_product_by_id(id:int,Course_data:CreateCourse,db:Session=Depends(get_db)):
    try:
        check_Category=db.query(Course).filter(Course.id==id).first()
        if not check_Category:
                            raise HTTPException (status_code=500,detail="Course not found.")
        update_data=Course_data.model_dump(exclude_unset=True)
        for key,value in update_data.items():
            setattr(check_Category,key,value)
        db.commit()
        db.refresh(check_Category)
        return {
            "status":200,
            "id":check_Category.id,
        }
    except Exception :
        raise HTTPException(status_code=500,detail="No found")

            