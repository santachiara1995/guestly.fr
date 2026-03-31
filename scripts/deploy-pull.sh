#!/usr/bin/env bash
set -euo pipefail

APP_DIR=${APP_DIR:-/home/didi/Desktop/guestly.fr}
REMOTE=${REMOTE:-origin}
BRANCH=${BRANCH:-master}

if [[ ! -d "$APP_DIR" ]]; then
  echo "App directory not found: $APP_DIR"
  exit 1
fi

if ! command -v git >/dev/null 2>&1; then
  echo "git not found. Install git first."
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "docker not found. Install Docker first."
  exit 1
fi

cd "$APP_DIR"
echo "Fetching latest git state"
git fetch "$REMOTE" "$BRANCH"
git pull --ff-only "$REMOTE" "$BRANCH"

echo "Rebuilding and starting Docker services"
docker compose up -d --build
