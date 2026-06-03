import React, { useState } from 'react';
import { GitBranch as Github, Folder, FileCode2, BookOpen, ChevronRight, FileText, Download } from 'lucide-react';

export default function Bloc4GithubRepo() {
    const [selectedFile, setSelectedFile] = useState<string | null>('README.md');

    const files = [
        { name: '.github/workflows', type: 'folder', children: ['mlops-ci.yml'] },
        { name: 'src', type: 'folder', children: ['train_model.py', 'app.py'] },
        { name: 'README.md', type: 'file' },
    ];

    const fileContent: Record<string, {lang: string, code: string}> = {
        'train_model.py': {
            lang: 'python',
            code: `import joblib
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
    train_and_save_model()`
        },
        'app.py': {
            lang: 'python',
            code: `from fastapi import FastAPI
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
    }`
        },
        'mlops-ci.yml': {
            lang: 'yaml',
            code: `name: Aurora Tech Chromebook MLOps CI Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'

    - name: Install Dependencies
      run: |
        pip install scikit-learn joblib fastapi uvicorn pytest

    - name: Run Automated Quality Gate Tests
      run: |
        pytest -v`
        },
        'README.md': {
            lang: 'markdown',
            code: `# Aurora Tech - AI Solutions (Bloc 4)

This repository contains the Machine Learning and MLOps components for predictive margin risk analysis.

## Directory Structure
- \`.github/workflows\`: CI/CD pipelines (GitHub Actions) for automatic testing.
- \`src/\`: Contains the predictive model and API service.
  - \`train_model.py\`: Script to train the Random Forest Classifier.
  - \`app.py\`: FastAPI application to serve predictions via REST endpoints.
`
        }
    };

    const renderTree = (item: any, prefix = '') => {
        if (item.type === 'file') {
            return (
                <div 
                    key={item.name} 
                    className={`flex items-center gap-2 py-1.5 px-2 hover:bg-slate-100 cursor-pointer text-sm ${selectedFile === item.name ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-slate-600'}`}
                    onClick={() => setSelectedFile(item.name)}
                >
                    <FileCode2 size={16} className={selectedFile === item.name ? 'text-amber-600' : 'text-slate-400'} />
                    <span>{item.name}</span>
                </div>
            )
        }
        return (
            <div key={item.name} className="py-1">
                <div className="flex items-center gap-2 py-1.5 px-2 text-sm text-slate-700 font-medium">
                    <ChevronRight size={16} className="text-slate-400" />
                    <Folder size={16} className="text-amber-500 fill-amber-500/20" />
                    <span>{item.name}</span>
                </div>
                <div className="pl-6 border-l border-slate-200 ml-3">
                    {item.children.map((child: string) => renderTree({name: child, type: 'file'}))}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white border text-left border-gray-200 rounded-xl overflow-hidden shadow-sm font-sans flex flex-col h-[700px]">
            <div className="bg-[#f6f8fa] border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <Github size={24} className="text-gray-800" />
                    <span className="font-semibold text-gray-800 text-lg">auroratech / bloc4_ai_solutions</span>
                    <span className="bg-gray-100 text-gray-600 border border-gray-200 text-xs px-2 py-0.5 rounded-full ml-2 font-medium">Public</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-md flex items-center gap-2 text-gray-700 shadow-sm transition-colors cursor-default">
                        <Download size={14} /> Code
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden bg-white">
                <div className="w-64 border-r border-gray-200 bg-[#fbfbfb] overflow-y-auto px-2 py-3 flex-shrink-0">
                    <div className="text-xs font-bold text-gray-500 mb-3 px-2 uppercase tracking-widest">Repository Map</div>
                    {files.map(f => renderTree(f))}
                </div>

                <div className="flex-1 bg-white overflow-y-auto p-6 relative">
                    {selectedFile && fileContent[selectedFile] && (
                        <div className="border border-gray-200 rounded-lg overflow-hidden pb-4 bg-white shadow-sm">
                            <div className="bg-[#f6f8fa] border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
                                {selectedFile === 'README.md' ? <BookOpen size={16} className="text-amber-500" /> : <FileText size={16} className="text-slate-500" />}
                                <span className="text-sm font-semibold text-gray-700">{selectedFile}</span>
                            </div>
                            <div className="px-5 pt-4 text-sm font-mono text-gray-800 overflow-x-auto">
                                <pre className="whitespace-pre-wrap leading-relaxed pb-4">
                                    {fileContent[selectedFile].code}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
