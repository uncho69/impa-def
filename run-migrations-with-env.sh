#!/bin/bash
# Migration script that uses DATABASE_URL from environment or prompts for it

cd "$(dirname "$0")"
export PATH="$HOME/.local/node/node-v20.20.0-darwin-x64/bin:$PATH"

if [ -z "$DATABASE_URL" ]; then
    echo "DATABASE_URL not set. Please provide it:"
    echo "Option 1: Export it: export DATABASE_URL='your_url'"
    echo "Option 2: Create .env.local file with: DATABASE_URL=your_url"
    echo ""
    read -p "Enter DATABASE_URL (or press Ctrl+C to cancel): " DB_URL
    export DATABASE_URL="$DB_URL"
fi

echo "Running migrations..."
npm run db:generate && npm run db:push
