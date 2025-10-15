#!/bin/bash

# Database Migration Helper Script
# Applies or rolls back SQL migrations

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo -e "${RED}Error: DATABASE_URL environment variable is not set${NC}"
  echo "Please set DATABASE_URL in your .env file or environment"
  exit 1
fi

# Function to display usage
usage() {
  echo "Usage: $0 [command] [migration_number]"
  echo ""
  echo "Commands:"
  echo "  up <number>     - Apply a specific migration (e.g., 002)"
  echo "  down <number>   - Rollback a specific migration (e.g., 002)"
  echo "  list            - List all available migrations"
  echo "  status          - Check if migrations have been applied"
  echo ""
  echo "Examples:"
  echo "  $0 up 002       - Apply migration 002_add_muscle_groups.sql"
  echo "  $0 down 002     - Rollback migration 002_add_muscle_groups.sql"
  echo "  $0 list         - List all migrations"
  exit 1
}

# Function to list migrations
list_migrations() {
  echo -e "${GREEN}Available migrations:${NC}"
  echo ""
  for file in migrations/*_*.sql; do
    if [[ ! "$file" =~ _down\.sql$ ]]; then
      basename "$file"
    fi
  done
}

# Function to check migration status
check_status() {
  echo -e "${YELLOW}Checking migration status...${NC}"
  echo ""

  # Check if muscle_groups table exists
  psql "$DATABASE_URL" -t -c "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'muscle_groups');" 2>/dev/null | grep -q 't' && \
    echo -e "${GREEN}✓ muscle_groups table exists${NC}" || \
    echo -e "${RED}✗ muscle_groups table does not exist${NC}"
}

# Function to apply migration
migrate_up() {
  local number=$1
  local migration_file="migrations/${number}_*.sql"

  # Find the migration file (excluding _down.sql)
  local file=$(ls $migration_file 2>/dev/null | grep -v "_down.sql" | head -n 1)

  if [ -z "$file" ]; then
    echo -e "${RED}Error: Migration ${number} not found${NC}"
    exit 1
  fi

  echo -e "${YELLOW}Applying migration: $(basename $file)${NC}"

  if psql "$DATABASE_URL" -f "$file"; then
    echo -e "${GREEN}✓ Migration applied successfully${NC}"
  else
    echo -e "${RED}✗ Migration failed${NC}"
    exit 1
  fi
}

# Function to rollback migration
migrate_down() {
  local number=$1
  local rollback_file="migrations/${number}_*_down.sql"

  # Find the rollback file
  local file=$(ls $rollback_file 2>/dev/null | head -n 1)

  if [ -z "$file" ]; then
    echo -e "${RED}Error: Rollback migration ${number} not found${NC}"
    exit 1
  fi

  echo -e "${YELLOW}Rolling back migration: $(basename $file)${NC}"
  echo -e "${RED}Warning: This will delete data!${NC}"
  read -p "Are you sure? (yes/no): " confirm

  if [ "$confirm" != "yes" ]; then
    echo "Rollback cancelled"
    exit 0
  fi

  if psql "$DATABASE_URL" -f "$file"; then
    echo -e "${GREEN}✓ Migration rolled back successfully${NC}"
  else
    echo -e "${RED}✗ Rollback failed${NC}"
    exit 1
  fi
}

# Main script logic
case "$1" in
  up)
    if [ -z "$2" ]; then
      echo -e "${RED}Error: Migration number required${NC}"
      usage
    fi
    migrate_up "$2"
    ;;
  down)
    if [ -z "$2" ]; then
      echo -e "${RED}Error: Migration number required${NC}"
      usage
    fi
    migrate_down "$2"
    ;;
  list)
    list_migrations
    ;;
  status)
    check_status
    ;;
  *)
    usage
    ;;
esac
