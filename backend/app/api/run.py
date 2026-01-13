from fastapi import APIRouter
from pydantic import BaseModel
from app.executor.runner import run_python_code

router = APIRouter(prefix="/api")

class CodeRequest(BaseModel):
    code: str

@router.post("/run")
def run_code(payload: CodeRequest):
    return run_python_code(payload.code)