#!/bin/sh
set -e
mkdir -p /app/models
if [ ! -f "/app/models/hair_scalp_model.h5" ]; then
  echo "Downloading model..."
  gdown --fuzzy "https://drive.google.com/file/d/$MODEL_GDRIVE_FILE_ID/view" -O /app/models/hair_scalp_model.h5
fi
exec uvicorn app.main:app --host 0.0.0.0 --port 8000