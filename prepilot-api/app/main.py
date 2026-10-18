from fastapi import FastAPI
app=FastAPI(title="PrePilot", description="User/admin")
app.get("/")
def root():
    return{
        "scuess":True,
        "message":"API running"
    }
# Check health
app.get("/api/v1/health")
def check_health():
    return {
        "status":200,
        "Service":"health check"
    }
    
   

