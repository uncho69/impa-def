#!/bin/bash

# Database Migration Script
# Run this in your terminal where Node.js is available

set -e

echo "🚀 Running database migrations..."

# Navigate to project directory
cd "$(dirname "$0")"

# Load nvm if available
if [ -s "$HOME/.nvm/nvm.sh" ]; then
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm use 20 2>/dev/null || nvm use --lts 2>/dev/null || true
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not found. Please ensure Node.js is installed and in your PATH."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL not set in environment"
    if [ -f ".env.local" ]; then
        echo "📄 Loading from .env.local..."
        export $(cat .env.local | grep -v '^#' | xargs)
    elif [ -f ".env" ]; then
        echo "📄 Loading from .env..."
        export $(cat .env | grep -v '^#' | xargs)
    fi
fi

if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL is not set. Please set it in your environment or .env.local file"
    exit 1
fi

echo "📦 Step 1: Generating migration files..."
npm run db:generate

echo ""
echo "📤 Step 2: Pushing migrations to database..."
npm run db:push

echo ""
echo "✅ Database migrations completed successfully!"
echo ""
echo "📋 New columns added to tweets table:"
echo "   - impressions (bigint)"
echo "   - is_verified (smallint, nullable)"
echo "   - verified_at (timestamp, nullable)"
echo "   - verified_by (varchar(50), nullable)"

