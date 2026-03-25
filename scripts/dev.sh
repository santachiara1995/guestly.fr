#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
API_PORT="${API_PORT:-3100}"
WEB_HOST="${WEB_HOST:-127.0.0.1}"
WEB_PORT="${WEB_PORT:-5173}"
API_URL="${VITE_API_URL:-http://127.0.0.1:${API_PORT}}"

if ! command -v bun >/dev/null 2>&1; then
  echo "bun not found. Install Bun from https://bun.sh/"
  exit 1
fi

run_service() {
  local dir="$1"
  local name="$2"
  shift 2

  echo "[$name] Installing deps (if needed)"
  if [[ ! -d "$dir/node_modules" ]]; then
    (cd "$dir" && bun install)
  fi

  echo "[$name] Starting dev server"
  (cd "$dir" && "$@")
}

trap 'kill 0' INT TERM

run_service "$ROOT_DIR/backend" "API" env PORT="$API_PORT" bun run dev &
run_service "$ROOT_DIR/frontend" "WEB" env VITE_API_URL="$API_URL" bun run dev -- --host "$WEB_HOST" --port "$WEB_PORT" &

wait
