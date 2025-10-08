import asyncio
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from backend.database import init_models
from .routing.auth import auth_Router
from .routing.secpass import secpass_router

from pathlib import Path

app = FastAPI(docs_url='/doc')
app.include_router(auth_Router)
app.include_router(secpass_router)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)


base_dir = Path(__file__).resolve().parent.parent
app.mount("/src", StaticFiles(directory=base_dir.__str__()+"/frontend/src"), name="static")

@app.on_event("startup")
async def startup_event_handler():
    ...
    #asyncio.create_task(init_models())

@app.get("/")
def main():
    return 1