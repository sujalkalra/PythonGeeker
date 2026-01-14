from pydantic import BaseModel
from typing import Optional

class Topic(BaseModel):
    id: Optional[str]
    module_id: str
    title: str
    explanation: str
    code: str