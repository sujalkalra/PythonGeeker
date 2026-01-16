from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.content import router as content_router
from api.run import router as run_router

app = FastAPI()

# Allow all origins for simplicity in this demo setup.
# In a real production app, you might want to restrict this to your Vercel domain.
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(content_router)
app.include_router(run_router)

@app.get("/")
def health_check():
    return {"status": "ok", "service": "PythonGeeker Backend"}
