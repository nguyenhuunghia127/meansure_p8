from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import threading
import uvicorn

app = FastAPI(title="P8 Test Analytics AI Service")

class ModuleData(BaseModel):
    moduleId: int
    name: str
    testCaseCount: int
    linkedRequirements: int
    totalRequirements: int
    passRate: float
    codeCoverage: float
    openBugs: int
    productionBugs: int

class ModulesRequest(BaseModel):
    modules: list[ModuleData]

# Global AI Model State
model = RandomForestClassifier(n_estimators=100, random_state=42)
scaler = StandardScaler()
is_trained = False

def train_initial_model():
    """
    Train the RandomForest model on historical QA data.
    In a true production environment, this data would be fetched globally from DB.
    """
    global is_trained
    np.random.seed(42)
    n_samples = 1500
    
    # Features: testCaseCount, reqCoverage, passRate, codeCoverage, openBugs, prodBugs
    X = pd.DataFrame({
        'testCaseCount': np.random.randint(0, 150, n_samples),
        'reqCoverage': np.random.uniform(0, 100, n_samples),
        'passRate': np.random.uniform(10, 100, n_samples),
        'codeCoverage': np.random.uniform(10, 100, n_samples),
        'openBugs': np.random.randint(0, 25, n_samples),
        'prodBugs': np.random.randint(0, 15, n_samples)
    })
    
    # Heuristic probability representing actual historical failure risk
    risk_prob = (
        (100 - X['passRate']) * 0.35 + 
        (100 - X['codeCoverage']) * 0.25 + 
        (100 - X['reqCoverage']) * 0.15 + 
        X['openBugs'] * 2.5 + 
        X['prodBugs'] * 5.0
    )
    
    # Classify as 1 (Prone to fail / High Risk) or 0 (Stable)
    y = (risk_prob > 45).astype(int) 

    X_scaled = scaler.fit_transform(X)
    model.fit(X_scaled, y)
    is_trained = True
    print("\n✅ AI Model successfully trained: RandomForestClassifier ready!")

# Background Training
threading.Thread(target=train_initial_model).start()

@app.post("/api/v1/ai/predict-risk")
def predict_risk(req: ModulesRequest):
    if not is_trained:
        return {"status": "error", "message": "Model is not trained yet."}
    
    results = []
    for m in req.modules:
        reqCov = (m.linkedRequirements / m.totalRequirements * 100) if m.totalRequirements > 0 else 0
        features = pd.DataFrame([{
            'testCaseCount': m.testCaseCount,
            'reqCoverage': reqCov,
            'passRate': m.passRate,
            'codeCoverage': m.codeCoverage,
            'openBugs': m.openBugs,
            'prodBugs': m.productionBugs
        }])
        
        feature_scaled = scaler.transform(features)
        
        # Risk Score is the probability of the failure class (1)
        proba = model.predict_proba(feature_scaled)[0][1]
        risk_score = min(max(round(proba * 100), 10), 100)
        
        if risk_score >= 70:
            risk_level = "high"
        elif risk_score >= 40:
            risk_level = "medium"
        else:
            risk_level = "low"
            
        results.append({
            "moduleId": m.moduleId,
            "riskScore": risk_score,
            "riskLevel": risk_level
        })
        
    return {"status": "success", "predictions": results}

@app.post("/api/v1/ai/suggest-tests")
def suggest_tests(req: ModulesRequest):
    suggestions = []
    for m in req.modules:
        suggs = []
        if m.testCaseCount == 0:
            suggs.append(f"Bổ sung Smoke Test căn bản cho module {m.name} vì chưa có kịch bản nào.")
        if m.passRate < 80:
            suggs.append(f"Tăng cường Regression Test tập trung vào các luồng đang gây lỗi ở {m.name}.")
        if m.codeCoverage < 70:
            suggs.append(f"Test cận biên (Boundary Testing) cho những phân nhánh code chưa được quét tại {m.name}.")
        if m.productionBugs > 0:
            suggs.append(f"Nhân bản ngữ cảnh Production Bug tại {m.name} thành bộ Automation Integration Test cố định.")
        
        if not suggs:
            suggs.append(f"Duy trì quy trình test hiện tại cho {m.name}, cần monitor thêm các bản cập nhật sắp tới.")
            
        suggestions.append({
            "moduleId": m.moduleId,
            "suggestedTests": suggs
        })
    
    return {"status": "success", "suggestions": suggestions}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
