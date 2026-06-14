from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.model import predict
from app.schemas import PredictionResult

app = FastAPI(title="HairScalp Analyzer API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ganti dengan domain frontend saat production
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok", "message": "HairScalp Analyzer API is running"}

@app.post("/predict", response_model=PredictionResult)
async def predict_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File harus berupa gambar.")
    
    image_bytes = await file.read()
    result      = predict(image_bytes)
    return result