# Backend CITYZ'France RPMS

API Bun + Elysia pour le site public CITYZ'France RPMS.

## Développement

```bash
bun install
bun run dev
```

## Démarrage simple

```bash
bun run start
```

Le backend expose les endpoints publics suivants :

- `GET /api/health`
- `GET /api/site`
- `GET /api/programs`
- `GET /api/programs/:slug`
- `GET /api/faq`
- `POST /api/leads`
