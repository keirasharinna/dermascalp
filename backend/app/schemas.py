from pydantic import BaseModel
from typing import Dict, Optional

class SeverityInfo(BaseModel):
    level: str
    color: str

class PredictionResult(BaseModel):
    predicted_class: str
    confidence: float
    all_scores: Dict[str, float]
    severity: SeverityInfo
    gradcam_heatmap: Optional[str] = None