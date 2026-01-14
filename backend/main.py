from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.content import router as content_router
from api.run import router as run_router

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://localhost:3002",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(content_router)
app.include_router(run_router)
