#!/bin/bash

# ----- SETTINGS -----
DISK_THRESHOLD=80
MEMORY_THRESHOLD=85
SERVICE_NAME="cron"
SOURCE_DIR="./test-data"
BACKUP_DIR="./backups"
LOG_FILE="./logs/health-backup.log"

# ----- FUNCTION: Write to log -----
log_message() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') -$1" >> "$LOG_FILE"
}

# ----- CHECK 1: Disk Space -----
check_disk_space() {
  USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
  if [ "$USAGE" -ge "$DISK_THRESHOLD" ]; then
    log_message "FAIL - Disk usage is${USAGE}%, above threshold of${DISK_THRESHOLD}%"
    return 1
  else
    log_message "OK - Disk usage is${USAGE}%"
    return 0
  fi
}

# ----- CHECK 2: Memory -----
check_memory() {
  USAGE=$(free | grep Mem | awk '{print int($3/$2 * 100)}')
  if [ "$USAGE" -ge "$MEMORY_THRESHOLD" ]; then
    log_message "FAIL - Memory usage is${USAGE}%, above threshold of${MEMORY_THRESHOLD}%"
    return 1
  else
    log_message "OK - Memory usage is${USAGE}%"
    return 0
  fi
}

# ----- CHECK 3: Service Running -----
check_service() {
  if pgrep "$SERVICE_NAME" > /dev/null; then
    log_message "OK - Service '$SERVICE_NAME' is running"
    return 0
  else
    log_message "FAIL - Service '$SERVICE_NAME' is NOT running"
    return 1
  fi
}

# ----- BACKUP FUNCTION -----
run_backup() {
  TIMESTAMP=$(date '+%Y%m%d-%H%M%S')
  if [ -d "$SOURCE_DIR" ]; then
    tar -czf "${BACKUP_DIR}/backup-${TIMESTAMP}.tar.gz" "$SOURCE_DIR"
    log_message "BACKUP SUCCESS - Created backup-${TIMESTAMP}.tar.gz"
  else
    log_message "BACKUP FAILED - Source folder '$SOURCE_DIR' does not exist"
  fi
}

# ----- MAIN SCRIPT LOGIC -----
log_message "----- Health check started -----"

check_disk_space
DISK_OK=$?

check_memory
MEMORY_OK=$?

check_service
SERVICE_OK=$?

if [ "$DISK_OK" -eq 0 ] && [ "$MEMORY_OK" -eq 0 ] && [ "$SERVICE_OK" -eq 0 ]; then
  log_message "All checks passed. Proceeding with backup."
  run_backup
else
  log_message "One or more checks failed. Backup skipped."
fi

log_message "----- Health check finished -----"
echo "Done. Check${LOG_FILE} for details."
