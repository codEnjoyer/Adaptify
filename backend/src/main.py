from fastapi import FastAPI

app = FastAPI(title="Adaptify")


@app.get("/")
async def root() -> str:
    return "Hello, world!"
    return 123
