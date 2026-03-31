#!/usr/bin/env bash
set -euo pipefail

APP_DIR=${APP_DIR:-/home/didi/Desktop/guestly.fr}
DOMAIN=${DOMAIN:-guestly.fr}
WEBHOOK_SECRET=${WEBHOOK_SECRET:-}
NGINX_SITE=${NGINX_SITE:-/etc/nginx/sites-available/guestly.fr}

if [[ -z "$WEBHOOK_SECRET" ]]; then
  echo "WEBHOOK_SECRET is required"
  exit 1
fi

if [[ ! -d "$APP_DIR" ]]; then
  echo "App directory not found: $APP_DIR"
  exit 1
fi

echo "[1/4] Installing webhook listener"
chmod +x "$APP_DIR/scripts/install-webhook.sh"
WEBHOOK_SECRET="$WEBHOOK_SECRET" sudo "$APP_DIR/scripts/install-webhook.sh"

echo "[2/4] Updating nginx site"
if ! grep -q "guestly-fr-webhook.conf" "$NGINX_SITE"; then
  sudo tee -a "$NGINX_SITE" >/dev/null <<'EOF'

  include /etc/nginx/snippets/guestly-fr-webhook.conf;
EOF
fi

sudo nginx -t
sudo systemctl reload nginx

echo "[3/4] Installing deploy timer (backup)"
chmod +x "$APP_DIR/scripts/deploy-pull.sh" "$APP_DIR/scripts/install-deploy-timer.sh"
sudo "$APP_DIR/scripts/install-deploy-timer.sh"

echo "[4/4] Done"
echo "Add GitHub webhook: https://$DOMAIN/_deploy"
