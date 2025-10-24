from fastapi import FastAPI
from fastapi.responses import FileResponse
import yaml, os

OPENAPI_PATH = os.environ.get("OPENAPI_PATH", "openapi/laasy-mvp.yaml")

app = FastAPI(title="LaaSyCorpTravel-MVP – API Contract Server")

@app.get("/openapi.yaml", include_in_schema=False)
def serve_openapi_file():
    return FileResponse(OPENAPI_PATH, media_type="application/yaml")

@app.get("/openapi.json", include_in_schema=False)
def serve_openapi_json():
    with open(OPENAPI_PATH, "r", encoding="utf-8") as f:
        spec = yaml.safe_load(f)
    return spec
