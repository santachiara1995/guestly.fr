# Local Development Guide

This repo has two apps:

- Backend: Bun + Elysia API (SQLite)
- Frontend: Vue + Vite

You can run them with Bun for fast dev, or with Docker Compose if Bun is not working.

## Option A: Run with Bun (recommended for dev)

Open two terminals.

Terminal 1 (API):

```bash
cd backend
bun install
bun run dev
```

Terminal 2 (Web):

```bash
cd frontend
bun install
bun run dev
```

Then open:

- Web: http://localhost:5173
- API: http://localhost:3100
- API health: http://localhost:3100/api/health

The backend defaults to the repo-root SQLite file, so the active database path no longer depends on whether you launch it from `backend/` or the repository root. `DB_PATH` still overrides that default when you need a custom location.

For this repo, do not assume port `3000` is free during local QA. The default local smoke baseline is backend `3100` plus `VITE_API_URL=http://127.0.0.1:3100` for the frontend:

```bash
cd backend
PORT=3100 bun run dev

cd ../frontend
VITE_API_URL=http://127.0.0.1:3100 bun run dev
```

If you need another local port pair, set both explicitly rather than relying on the frontend fallback API URL.

Note: Running `bun run dev` from the repo root will fail. It must be run inside
`backend` or `frontend`.

## Option B: Run with Docker Compose (no Bun required)

From the repo root:

```bash
docker compose up --build
```

Then open:

- Web: http://localhost:8086
- API: http://localhost:3006/api/health
- Adminer: http://localhost:9086

## Common Bun issues and fixes

1) Bun not installed or not on PATH

```bash
bun --version
```

If this fails, install Bun from https://bun.sh/ and restart your terminal.

2) Running in the wrong folder

Make sure you are in `backend` or `frontend` before running `bun run dev`.

3) Dependencies not installed

Run `bun install` in the folder you are trying to start.

## Project layout

- `backend/` API (Bun + Elysia)
- `frontend/` Vue app (Vite)
- `docker-compose.yml` Local multi-service setup
- `docs/` Deployment and VPS notes
- `scripts/` VPS setup helpers

## Notes

- Tests are not configured yet.
- Frontend build-time API URL is configured in `frontend/vite.config.js` and
  `docker-compose.yml` build args.
