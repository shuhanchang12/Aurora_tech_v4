from fastapi import FastAPI
import joblib
import pydantic

app = FastAPI(title="Aurora Tech AI Risk Prediction Engine", version="2026.06")

class ProcurementInput(pydantic.BaseModel):
    eur_to_usd: float
    eur_to_twd: float
    component_delay_days: int
    freight_cost_eur: float

@app.on_event("startup")
def load_model_artifact():
    global model
    model = joblib.load('auroratech_chromebook_model.pkl')

@app.post("/predict-margin-risk")
def predict_risk(data: ProcurementInput):
    # Format input vectors
    features = [[data.eur_to_usd, data.eur_to_twd, data.component_delay_days, data.freight_cost_eur]]
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][1]
    
    # Generate business recommendations & future-proof Web3 trigger conditions
    if prediction == 1:
        if data.freight_cost_eur >= 45.00:
            recommendation = "[WARNING] Switched to Air France Cargo. Cost jumped to 45 EUR. Action: Pre-load USDC using Web3 to lock in prices quickly and bypass slow bank transfers."
        else:
            recommendation = "[WARNING] Bad exchange rates detected. Action: Contact the bank immediately to lock in the currency rate."
    else:
        recommendation = "[INFO] Costs and delays are normal. Safe to proceed with normal orders."
        
    return {
        "status": "success",
        "margin_impact_risk_detected": bool(prediction),
        "risk_probability": f"{probability * 100:.2f}%",
        "recommendation": recommendation
    }
