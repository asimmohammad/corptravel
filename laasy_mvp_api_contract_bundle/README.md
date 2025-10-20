# LaaSyCorpTravel-MVP – API Contract Tools

These tools automate the validation, publishing, and SDK generation for the MVP OpenAPI specification.

## 📦 Folder Contents
```
tools/api-contract/
├── server/main.py                # FastAPI server hosting /openapi.yaml & /openapi.json
├── README.md                     # Usage & developer guide
├── clients/                      # Generated SDK clients (TypeScript Axios & Python)
└── .github/workflows/api-contract.yml  # CI pipeline for spec validation & SDK generation
```

## 🧩 CI Workflow
- Runs on every PR affecting `/openapi` or `/tools/api-contract`.
- Validates spec integrity.
- Generates TypeScript Axios and Python SDKs.
- Publishes results as GitHub Action artifacts.
