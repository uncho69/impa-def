#!/bin/bash

# Final Database Migration Script
# This script will run migrations once DATABASE_URL is provided

set -e

cd "$(dirname "$0")"
export PATH="$HOME/.local/node/node-v20.20.0-darwin-x64/bin:$PATH"

echo "🚀 Database Migration Script"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Loading from local installation..."
    export PATH="$HOME/.local/node/node-v20.20.0-darwin-x64/bin:$PATH"
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"
echo ""

# Check for DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    # Try loading from .env.local
    if [ -f ".env.local" ]; then
        echo "📄 Loading DATABASE_URL from .env.local..."
        export $(grep -v '^#' .env.local | grep DATABASE_URL | xargs)
    elif [ -f ".env" ]; then
        echo "📄 Loading DATABASE_URL from .env..."
        export $(grep -v '^#' .env | grep DATABASE_URL | xargs)
    fi
fi

# If still not set, prompt or exit
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL is not set."
    echo ""
    echo "Please set it using one of these methods:"
    echo ""
    echo "Method 1: Export in terminal:"
    echo "  export DATABASE_URL='postgresql://user:pass@host:port/database'"
    echo "  ./run-migrations-final.sh"
    echo ""
    echo "Method 2: Create .env.local file:"
    echo "  echo 'DATABASE_URL=postgresql://user:pass@host:port/database' > .env.local"
    echo "  ./run-migrations-final.sh"
    echo ""
    echo "Method 3: Get from Vercel (if deployed):"
    echo "  vercel env pull .env.local"
    echo "  ./run-migrations-final.sh"
    exit 1
fi

echo "✅ DATABASE_URL is set"
echo ""

# Run migrations
echo "📦 Step 1: Generating migration files..."
npm run db:generate

echo ""
echo "📤 Step 2: Pushing migrations to database..."
npm run db:push

echo ""
echo "✅ Database migrations completed successfully!"
echo ""
echo "📋 New columns added to tweets table:"
echo "   ✓ impressions (bigint)"
echo "   ✓ is_verified (smallint, nullable)"
echo "   ✓ verified_at (timestamp, nullable)"
echo "   ✓ verified_by (varchar(50), nullable)"

