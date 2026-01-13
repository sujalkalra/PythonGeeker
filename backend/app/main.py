from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.content import router as content_router
from app.api.run import router as run_router

app = FastAPI(
    title="PythonGeeker API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "PythonGeeker backend running"}

app.include_router(content_router)
app.include_router(run_router)