# LaaSyCorpTravel-MVP – API Contract Automation

This folder contains the tools to host, validate, and generate SDK clients for the MVP OpenAPI specification.

## 🚀 Local Usage

Start the FastAPI-based OpenAPI server:
```bash
uvicorn tools.api-contract.server.main:app --reload --port 8081
open http://localhost:8081/openapi.yaml
```

## 🧰 Manual Client Generation
Generate TypeScript and Python clients directly from the contract:
```bash
openapi-generator-cli generate -i openapi/laasy-mvp.yaml -g typescript-axios -o tools/api-contract/clients/ts-axios
openapi-generator-cli generate -i openapi/laasy-mvp.yaml -g python -o tools/api-contract/clients/python
```

## 🧪 GitHub Actions
- Validates the OpenAPI spec using `swagger-cli`.
- Generates SDK clients automatically on every Pull Request.
- Uploads them as artifacts for developers to download.
