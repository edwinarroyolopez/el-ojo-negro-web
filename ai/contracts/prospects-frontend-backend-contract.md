# Prospects Frontend-Backend Contract

## API base

- `NEXT_PUBLIC_API_URL=http://localhost:7000/api`

## Auth

### Login request

`POST /auth/login`

```json
{ "phone": "+573001234567" }
```

### Login response from backend

```json
{
  "accessToken": "jwt",
  "user": {
    "_id": "...",
    "phone": "+573001234567",
    "role": "OWNER",
    "name": "Operador",
    "accountId": "..."
  }
}
```

### Frontend mapped session

```json
{
  "token": "jwt",
  "user": {
    "id": "...",
    "phone": "+573001234567",
    "role": "OWNER",
    "name": "Operador",
    "accountId": "..."
  }
}
```

### Me

`GET /auth/me` -> `{ user, account }`

The protected shell syncs this to Zustand for current user/account context.

## Prospects

Private routes consumed by frontend:

- `POST /prospects/import`
- `GET /prospects`
- `GET /prospects/metrics`
- `GET /prospects/:id`
- `PATCH /prospects/:id`
- `PATCH /prospects/:id/status`
- `PATCH /prospects/:id/diagnosis`
- `POST /prospects/:id/diagnosis/publish`
- `POST /prospects/:id/diagnosis/unpublish`

Public route:

- `GET /public/diagnostics/:slug`

## Enum source of truth

Frontend enums must match backend exactly:

- `ProspectStatus`
- `ProspectPriority`
- `DiagnosisVisibility`
- `DiagnosisStatus`

## Private/public separation

Frontend must never expect public payloads to contain:

- `internalNotes`
- `rawPayload`
- `rawDiscovery`
- `providerIntelligence`
- `outreach`
- internal commercial status

## Publication flow

1. Save diagnosis with `PATCH /prospects/:id/diagnosis`
2. Publish with `POST /prospects/:id/diagnosis/publish`
3. Read public page with `GET /public/diagnostics/:slug`

## Import shape note

The frontend import screen validates these accepted shapes before sending them:

- Panalbee envelope with `researchVersion`, `generatedAt`, `promptTarget`, `candidates[]`
- raw array
- wrapped collections: `items`, `prospects`, `results`, `leads`, `data`
- single prospect-like object
