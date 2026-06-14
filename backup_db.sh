#!/bin/bash

source backend/.env

FECHA=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"

mkdir -p "$BACKUP_DIR"

mysqldump \
  -h "$DATABASE_HOST" \
  -P "$DATABASE_PORT" \
  -u "$DATABASE_USER" \
  -p"$DATABASE_PASSWORD" \
  --single-transaction \
  --routines \
  --triggers \
  "$DATABASE_NAME" \
  | gzip > "$BACKUP_DIR/${DATABASE_NAME}_$FECHA.sql.gz"

echo "Backup generado: $BACKUP_DIR/${DATABASE_NAME}_$FECHA.sql.gz"
