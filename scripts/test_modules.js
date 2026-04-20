const http = require('http');

const PORT_NEST = 3000;
const PORT_AI = 5000;

function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode >= 400) throw new Error(`HTTP ${res.statusCode}: ${data}`);
          resolve(JSON.parse(data));
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

function logTest(moduleName, passed, details) {
  const icon = passed ? '(PASS)' : '[FAIL]';
  console.log(`${icon} MODULE: ${moduleName}`);
  if (details) console.log(`   -> ${details}`);
}

async function runTests() {
  console.log('=== STARTING MULTI-LAYER MODULE TESTS ===\\n');

  // 1. DUMMY DATA
  const aiPayload = JSON.stringify({
    modules: [{
      moduleId: 999,
      name: 'Test Module',
      testCaseCount: 15,
      linkedRequirements: 5,
      totalRequirements: 10,
      passRate: 60.5,
      codeCoverage: 45.0,
      openBugs: 12,
      productionBugs: 3
    }]
  });

  // 1. Python AI: /predict-risk
  try {
    const riskData = await fetchJson(`http://localhost:${PORT_AI}/api/v1/ai/predict-risk`, {
      method: 'POST', body: aiPayload, headers: {'Content-Type': 'application/json'}
    });
    if (riskData.status === 'success' && riskData.predictions.length > 0) {
      logTest('AI Prediction (Python ML)', true, `Risk Level: ${riskData.predictions[0].riskLevel}, Score: ${riskData.predictions[0].riskScore}`);
    } else throw new Error(JSON.stringify(riskData));
  } catch(e) {
    logTest('AI Prediction (Python ML)', false, e.message);
  }

  // 2. Python AI: /suggest-tests
  try {
    const suggData = await fetchJson(`http://localhost:${PORT_AI}/api/v1/ai/suggest-tests`, {
      method: 'POST', body: aiPayload, headers: {'Content-Type': 'application/json'}
    });
    if (suggData.status === 'success' && suggData.suggestions.length > 0) {
      logTest('AI Recommendations (Python ML)', true, `Generated ${suggData.suggestions[0].suggestedTests.length} test scenarios.`);
    } else throw new Error(JSON.stringify(suggData));
  } catch(e) {
    logTest('AI Recommendations (Python ML)', false, e.message);
  }

  // 3. Node.js Backend: /metrics/overview
  try {
    const overview = await fetchJson(`http://localhost:${PORT_NEST}/api/v1/metrics/overview`);
    if (overview && overview.summary && overview.modules) {
      logTest('Metrics Overview Engine (NodeJS)', true, `Calculated coverage and metrics for ${overview.modules.length} logic modules.`);
    } else throw new Error('Invalid overview payload');
  } catch(e) {
    logTest('Metrics Overview Engine (NodeJS)', false, e.message);
  }

  // 4. Node.js E2E: Refresh AI Analysis
  try {
    const refresh = await fetchJson(`http://localhost:${PORT_NEST}/api/v1/analysis/refresh`, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' }
    });
    if (refresh && refresh.refreshedAt) {
       logTest('E2E AI Integration (NodeJS -> Python)', true, `Successfully aggregated historical data and proxied ML predictions for ${refresh.totalModules} modules.`);
    } else throw new Error('Refresher failed');
  } catch(e) {
    logTest('E2E AI Integration (NodeJS -> Python)', false, e.message);
  }
}

runTests();
