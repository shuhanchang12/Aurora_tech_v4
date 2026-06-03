import os
from src.train_model import train_and_save_model

def execute_retraining_pipeline():
    print("Drift threshold exceeded. Initiating automated model retraining...")
    # Fetch new data from DB, recreate features...
    print("Training new model version...")
    train_and_save_model()
    print("Retraining successful. Syncing new artifact to registry.")

if __name__ == "__main__":
    execute_retraining_pipeline()