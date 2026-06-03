import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier

def train_and_save_model():
    print("[MLOps] Extracting feature matrices from local warehouse...")
    
    # Feature vectors: [eur_to_usd, eur_to_twd, component_delay_days, freight_cost_eur]
    X_train = np.array([
        [1.0900, 35.20, 0, 5.00],   # Case 1: Strong Euro, No Delay, Sea Freight
        [1.0400, 34.10, 2, 45.00],  # Case 2: Weak Euro, Air France Cargo Expedited (High Cost)
        [1.0900, 35.60, 1, 5.00],   # Case 3: Strong Euro, 1-day Delay, Sea Freight
        [1.0300, 33.80, 12, 5.00],  # Case 4: Weak Euro, 12-day Sea Delay (High Delay)
        [1.0800, 35.00, 2, 45.00]   # Case 5: Strong Euro, Air France Cargo Expedited (High Cost)
    ])
    
    # Target Labels: 0 (Stable Margin), 1 (Margin Impacted / Compressed)
    y_train = np.array([0, 1, 0, 1, 1])

    # Train Random Forest
    model = RandomForestClassifier(n_estimators=10, random_state=42)
    model.fit(X_train, y_train)

    # Serialize model artifact
    joblib.dump(model, 'auroratech_chromebook_model.pkl')
    print("[MLOps] Model training completed. Artifact saved as 'auroratech_chromebook_model.pkl'")

if __name__ == "__main__":
    train_and_save_model()
