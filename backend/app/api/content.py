from fastapi import APIRouter
from app.core.database import modules_collection, topics_collection

router = APIRouter(prefix="/api")

@router.get("/modules")
def get_modules():
    modules = []
    for m in modules_collection.find():
        m["_id"] = str(m["_id"])
        modules.append(m)
    return modules

@router.get("/modules/{module_id}/topics")
def get_topics(module_id: str):
    topics = []
    for t in topics_collection.find({"module_id": module_id}):
        t["_id"] = str(t["_id"])
        topics.append(t)
    return topics