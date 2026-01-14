from pydantic import BaseModel
from typing import Optional

class Module(BaseModel):
    id: Optional[str]
    title: str
    order: int
    description: str