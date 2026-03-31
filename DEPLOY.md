# DEPLOY.md

This file is the canonical deployment guide for `guestly.fr`.

Use it after cloning the repo onto a new VPS or when rebuilding the host setup from scratch.

## Deployment model

`guestly.fr` uses a source-build deploy model.

The canonical deploy flow is:

```bash
cd /home/didi/Desktop/guestly.fr
git fetch origin master
git pull --ff-only origin master
docker compose up -d --build
```

Do not rely on GHCR images for the main deploy path.

## Canonical VPS paths

- Repo path:
  - `/home/didi/Desktop/guestly.fr`
- Host nginx site file:
  - `/etc/nginx/sites-available/guestly.fr`
- Host nginx symlink:
  - `/etc/nginx/sites-enabled/guestly.fr`
- Optional webhook env:
  - `/etc/guestly-fr/webhook.env`
- Optional webhook snippet:
  - `/etc/nginx/snippets/guestly-fr-webhook.conf`

## Ports

Docker compose exposes:

- web:
  - `8086 -> 80`
- api:
  - `3006 -> 3000`
- adminer:
  - `9086 -> 8080`

Host nginx must proxy:

- `/` -> `http://127.0.0.1:8086`
- `/api/` -> `http://127.0.0.1:3006`

## Clone and first boot

Clone:

```bash
cd /home/didi/Desktop
git clone https://github.com/santachiara1995/guestly.fr.git
cd guestly.fr
```

Start once:

```bash
docker compose up -d --build
```

## Host requirements

Install:

- `git`
- `docker`
- `docker compose`
- `nginx`
- `certbot`
- `python3-certbot-nginx`
- `bun`

## nginx host config

Canonical host config:

```nginx
server {
  listen 80;
  server_name guestly.fr www.guestly.fr;

  location / {
    proxy_pass http://127.0.0.1:8086;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /api/ {
    proxy_pass http://127.0.0.1:3006;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Enable:

```bash
sudo ln -sf /etc/nginx/sites-available/guestly.fr /etc/nginx/sites-enabled/guestly.fr
sudo nginx -t
sudo systemctl reload nginx
```

TLS:

```bash
sudo certbot --nginx -d guestly.fr -d www.guestly.fr -m YOU@example.com --agree-tos --non-interactive
```

## GitHub Actions deploy

Workflow file:

- `.github/workflows/deploy.yml`

Required GitHub secrets:

- `TAILSCALE_AUTH_KEY`
- `SSH_PRIVATE_KEY`

Current workflow behavior:

1. join Tailscale
2. SSH into the VPS
3. `cd /home/didi/Desktop/guestly.fr`
4. `git fetch origin master`
5. `git pull --ff-only origin master`
6. `docker compose up -d --build`

## Optional webhook/timer deploy

Available helper scripts:

- `scripts/deploy-pull.sh`
- `scripts/install-deploy-timer.sh`
- `scripts/install-systemd.sh`
- `scripts/install-webhook.sh`
- `scripts/setup-webhook.sh`

Recommended meaning:

- `deploy-pull.sh`
  - fetches `master`
  - fast-forwards
  - rebuilds with `docker compose up -d --build`
- `install-systemd.sh`
  - installs a one-shot compose service for reboot recovery
- `install-deploy-timer.sh`
  - installs a periodic rebuild timer
- `install-webhook.sh` and `setup-webhook.sh`
  - install a GitHub push webhook listener on `/_deploy`

If you use the webhook flow, provide:

- `WEBHOOK_SECRET`

## Reboot recovery

Minimum recovery command:

```bash
cd /home/didi/Desktop/guestly.fr
docker compose up -d --build
```

Recommended persistent recovery:

```bash
cd /home/didi/Desktop/guestly.fr
chmod +x scripts/install-systemd.sh
./scripts/install-systemd.sh
```

That installs a systemd unit that can bring the stack back up on reboot.

## Verification

Local host checks:

```bash
curl -I -H 'Host: guestly.fr' http://127.0.0.1/
curl -I http://127.0.0.1:3006/api/health
docker ps
```

Public checks:

```bash
curl -I https://guestly.fr/
curl -I https://guestly.fr/programme
curl -I https://guestly.fr/financement
curl -I https://guestly.fr/faq
curl -I https://guestly.fr/contact
curl -I https://guestly.fr/api/health
```

## Notes

- Frontend nginx is inside the web container via `frontend/nginx.conf`.
- The host nginx only reverse-proxies to Docker ports.
- `docker-compose.prod.yml` is not the primary deploy path. Treat it as an optional override only.
