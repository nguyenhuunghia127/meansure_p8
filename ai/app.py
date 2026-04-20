from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import threading
import uvicorn
from fastapi import Request
import pandas as pd
import joblib

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

@app.post("/train")
async def train_initial_model(request: Request):
    """
    Train the RandomForest model using real DB data overriding old mock logic.
    """
    global is_trained, model
    try:
        data = await request.json()
        if not data or len(data) == 0:
            return {"error": "Không có dữ liệu để train", "status": 400}

        df = pd.DataFrame(data)
        features = ['reqCoverage', 'passRate', 'testingBugs', 'productionBugs']
        
        # Verify columns exist
        for f in features:
            if f not in df.columns:
                df[f] = 0

        X = df[features]
        y = df.get('riskLevel', pd.Series([0]*len(df)))

        X_scaled = scaler.fit_transform(X)
        model.fit(X_scaled, y)
        is_trained = True
        
        joblib.dump(model, 'real_trained_model.pkl')
        print("\n[OK] AI Model successfully trained from Real Data Pipeline!")
        return {"message": f"Đã train mô hình thành công với {len(df)} dòng dữ liệu!", "status": 200}
    except Exception as e:
        return {"error": str(e), "status": 500}

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
    import os
    if os.path.exists("real_trained_model.pkl"):
        model = joblib.load("real_trained_model.pkl")
        is_trained = True
    uvicorn.run(app, host="0.0.0.0", port=5000)
