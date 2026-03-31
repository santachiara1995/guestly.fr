# CITYZ'France RPMS

CITYZ'France RPMS is a public education site focused on one program for particuliers. The stack is:

- `frontend/`: Vue 3 + Vite
- `backend/`: Bun + Elysia + SQLite
- Docker orchestration for local runs and VPS deployment

The product surface includes:

- a multi-page public site for the RPMS program
- a program page and learner-path page
- a single admissions/contact flow with thank-you state
- FAQ, legal, and privacy pages
- a Bun + Elysia backend serving content and lead intake

## Local development

Backend:

```bash
cd backend
bun install
bun run dev
```

Frontend:

```bash
cd frontend
bun install
bun run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- API: `http://localhost:3000/api/health`

If port `3000` is already in use on your machine, start the API on another port and point Vite to it explicitly:

```bash
cd backend
PORT=3100 bun run dev

cd ../frontend
VITE_API_URL=http://127.0.0.1:3100 bun run dev
```

## Docker

Start the full stack:

```bash
docker compose up --build
```

Current compose defaults:

- Web: `http://localhost:8086`
- API: `http://localhost:3006/api/health`
- Adminer: `http://localhost:9086`

SQLite persistence normally targets `data/app.db` at the repo root, regardless of the current working directory. If that path is not writable, the backend falls back to `app.local.db` at the repo root. `DB_PATH` still overrides both.

## API overview

Public endpoints:

- `GET /api/health`
- `GET /api/site`
- `GET /api/programs`
- `GET /api/programs/:slug`
- `GET /api/faq`
- `POST /api/leads`

## Deployment

The canonical deploy target is `/home/didi/Desktop/guestly.fr` on the VPS.

The default deploy model is source-based:

```bash
git pull --ff-only origin master
docker compose up -d --build
```

The repo keeps a GitHub Actions based deploy flow for `master`, plus helper scripts under `scripts/`.

Relevant files:

- `.github/workflows/deploy.yml`
- `docker-compose.yml`
- `docker-compose.prod.yml` (optional override)
- `scripts/deploy-pull.sh`

## Environment

- Backend example: `backend/.env.example`
- Frontend example: `frontend/.env.example`
