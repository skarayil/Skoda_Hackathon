#!/usr/bin/env bash

set -e  # Exit on error
set -x  # Print commands before execution

echo "Waiting for database to start..."

# Run database setup
python src/database/db_setup.py

# Run Alembic migrations
alembic upgrade head

echo "Database setup complete!"
