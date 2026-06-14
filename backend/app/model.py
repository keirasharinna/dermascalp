import numpy as np
import tensorflow as tf
from PIL import Image
import io, os, base64, cv2

IMG_SIZE = (300, 300)
CLASS_NAMES = ["Alopecia_Areata","Dandruff","Folliculitis","Hair_Loss_General","Head_Lice","Healthy_Scalp","Psoriasis"]
SEVERITY_MAP = {
    "Healthy_Scalp":     {"level": "NORMAL — KONDISI AMAN",          "color": "green"},
    "Dandruff":          {"level": "RINGAN — BISA DITANGANI MANDIRI", "color": "yellow"},
    "Alopecia_Areata":   {"level": "SEDANG — PERLU PERHATIAN MEDIS",  "color": "yellow"},
    "Hair_Loss_General": {"level": "SEDANG — PERLU PERHATIAN MEDIS",  "color": "yellow"},
    "Folliculitis":      {"level": "SEDANG — PERLU PERHATIAN MEDIS",  "color": "yellow"},
    "Head_Lice":         {"level": "PARAH — BUTUH INTERVENSI MEDIS",  "color": "red"},
    "Psoriasis":         {"level": "PARAH — BUTUH INTERVENSI MEDIS",  "color": "red"},
}

MODEL_PATH = os.getenv("MODEL_PATH", "models/hair_scalp_model.h5")
model = tf.keras.models.load_model(MODEL_PATH, compile=False)

def _build_gradcam_model():
    try:
        efficientnet = model.get_layer('efficientnetv2-s')
        eff_dual = tf.keras.Model(
            inputs=efficientnet.inputs,
            outputs=[efficientnet.get_layer('top_conv').output, efficientnet.output]
        )
        img_input = tf.keras.Input(shape=(300, 300, 3))
        top_conv_out, eff_out = eff_dual(img_input)
        x = eff_out
        for layer in model.layers[2:]:
            x = layer(x)
        print("Grad-CAM model built successfully")
        return tf.keras.Model(inputs=img_input, outputs=[top_conv_out, x])
    except Exception as e:
        print(f"Grad-CAM model build failed: {e}")
        return None

gradcam_model = _build_gradcam_model()

def preprocess(image_bytes: bytes) -> np.ndarray:
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize(IMG_SIZE)
    arr = np.array(img, dtype=np.float32)
    return np.expand_dims((arr / 127.5) - 1.0, axis=0)

def generate_gradcam(image_bytes: bytes, class_idx: int) -> str | None:
    if gradcam_model is None:
        return None
    try:
        img_var = tf.Variable(preprocess(image_bytes), dtype=tf.float32)
        with tf.GradientTape() as tape:
            conv_outputs, predictions = gradcam_model(img_var, training=False)
            loss = predictions[0, class_idx]
        grads = tape.gradient(loss, conv_outputs)
        weights = tf.reduce_mean(grads, axis=(1, 2))[0].numpy()
        conv_out = conv_outputs[0].numpy()
        cam = np.zeros(conv_out.shape[:2], dtype=np.float32)
        for i, w in enumerate(weights):
            cam += w * conv_out[:, :, i]
        cam = np.maximum(cam, 0)
        cam = cv2.resize(cam, IMG_SIZE)
        cam = np.clip(cam, 0, np.percentile(cam, 95))
        cam = (cam - cam.min()) / (cam.max() - cam.min() + 1e-8)
        cam = cv2.GaussianBlur(cam, (15, 15), 0)
        heatmap = cv2.applyColorMap(np.uint8(255 * cam), cv2.COLORMAP_JET)
        orig = np.array(Image.open(io.BytesIO(image_bytes)).convert("RGB").resize(IMG_SIZE))
        orig_bgr = orig[:, :, ::-1]
        overlay = cv2.addWeighted(orig_bgr, 0.55, heatmap, 0.45, 0)
        _, buffer = cv2.imencode(".jpg", overlay)
        return "data:image/jpeg;base64," + base64.b64encode(buffer).decode()
    except Exception as e:
        print(f"Grad-CAM error: {e}")
        return None

def predict(image_bytes: bytes) -> dict:
    logits = model.predict(preprocess(image_bytes), verbose=0)[0]
    # Convert logits → softmax probability
    exp = np.exp(logits - np.max(logits))
    softmax = exp / exp.sum()
    class_idx = int(np.argmax(softmax))
    predicted_class = CLASS_NAMES[class_idx]
    return {
        "predicted_class": predicted_class,
        "confidence":      float(softmax[class_idx]),
        "all_scores":      {CLASS_NAMES[i]: float(softmax[i]) for i in range(len(CLASS_NAMES))},
        "severity":        SEVERITY_MAP.get(predicted_class, {"level": "TIDAK DIKETAHUI", "color": "green"}),
        "gradcam_heatmap": generate_gradcam(image_bytes, class_idx)
    }