#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/ubuntu/sevico-fe"
APP_NAME="sevico3300"
PORT="3300"

cd "$APP_DIR"

# Install pm2 if missing
if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi

# Install deps and build
npm ci
npm run build

# Start or restart the app on the chosen port
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 restart "$APP_NAME" --update-env
else
  pm2 start npm --name "$APP_NAME" -- run start -- --hostname 0.0.0.0 --port "$PORT"
fi

# Persist process list and enable startup
pm2 save
pm2 startup --silent || true

echo "PM2 service '$APP_NAME' running on port $PORT"