const app = document.getElementById('app');
const loading = document.getElementById('loading');
const status = document.getElementById('status');
const statusMsg = document.getElementById('status-msg');
const timeRangeSelect = document.getElementById('time-range');
const moduleNameSelect = document.getElementById('module-name');

const aiUploadContainer = document.getElementById('ai-upload-container');
const aiUploadFile = document.getElementById('ai-upload-file');
const aiUploadName = document.getElementById('ai-upload-name');
const aiUploadHint = document.getElementById('ai-upload-hint');
const uploadAnalysisPreview = document.getElementById('upload-analysis-preview');

const dataImportContainer = document.getElementById('data-import-container');
const importTypeSelect = document.getElementById('import-type');
const importProjectNameInput = document.getElementById('import-project-name');
const importExtraNameInput = document.getElementById('import-extra-name');
const importFileInput = document.getElementById('import-file');
const importHeaderHintInput = document.getElementById('import-header-hint');
const importExampleHintInput = document.getElementById('import-example-hint');
const dataImportPreview = document.getElementById('data-import-preview');

const navLinks = document.querySelectorAll('.nav-link');
const currentPageTitle = document.getElementById('current-page-title');
const roleSelector = document.getElementById('user-role');
let currentActiveView = 'view-overview';
let currentRole = 'admin'; // 'admin' or 'tester'

if(roleSelector) {
  roleSelector.addEventListener('change', (e) => {
    currentRole = e.target.value;
    renderDashboard();
  });
}

const state = {
  overview: null,
  templates: null,
  timeFilter: null,
  moduleFilter: null,
};

const importTypeHints = {
  'test-case-repository': { extraLabel: 'Module Name', extraDefault: 'Admin Panel', example: 'moduleName,testCaseCode,testCaseTitle,requirementCode,requirementTitle' },
  'execution-report': { extraLabel: 'Run Name', extraDefault: 'Sprint Regression', example: 'testCaseCode,status,executionTimeSeconds,actualResult' },
  'bug-tracking': { extraLabel: 'Tracker Name', extraDefault: 'jira', example: 'bugCode,moduleName,title,severity,priority,source,status' },
  'code-repository': { extraLabel: 'Repository Name', extraDefault: 'measurement-backend', example: 'moduleName,coveragePercent,reportDate' },
};

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const pct = (value) => Number(value || 0).toFixed(2).replace(/\.00$/, '') + '%';

const setState = (kind, message) => {
  status.className = 'status' + (kind === 'busy' ? ' busy' : kind === 'error' ? ' error' : '');
  status.textContent = kind === 'busy' ? 'Running' : kind === 'error' ? 'Error' : 'Ready';
  statusMsg.textContent = message;
};

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error('Request failed with status ' + response.status + ' for ' + url);
  return response.json();
}

function updateImportHints() {
  const importType = importTypeSelect.value || 'test-case-repository';
  const hint = importTypeHints[importType] ?? importTypeHints['test-case-repository'];
  importExtraNameInput.value = hint.extraDefault;
  importHeaderHintInput.value = `Headers should match ${importType}`;
  importExampleHintInput.value = hint.example;
}

function renderUploadAnalysis(result, scenarioName, analysisHint) {
  const signals = (result.detectedSignals || []).map((s) => `- ${s}`).join('\n');
  const issues = (result.issues || []).map((i) => `- ${i}`).join('\n');
  const suggestedTests = (result.suggestedTests || []).map((t) => `- ${t}`).join('\n');
  uploadAnalysisPreview.textContent = `Scenario: ${scenarioName || 'Uploaded file analysis'}\nHint: ${analysisHint || 'Find risks'}\nFile: ${result.fileName}\nType: ${result.mimeType}\nSize: ${result.size} bytes\nRisk Level: ${result.riskLevel}\nConfidence: ${result.confidenceScore}/100\n\nSummary\n${result.summary}\n\nSignals\n${signals || '- None'}\n\nIssues\n${issues || '- None'}\n\nSuggested Tests\n${suggestedTests || '- None'}\n\nPreview\n${result.extractedPreview || '(empty)'}`;
}

async function runUploadAnalysis() {
  const file = aiUploadFile.files?.[0];
  const scenarioName = aiUploadName.value.trim();
  const analysisHint = aiUploadHint.value.trim();
  if (!file) throw new Error('Please choose a file before running AI Test.');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('scenarioName', scenarioName || 'Uploaded file analysis');
  formData.append('analysisHint', analysisHint || 'Find risks, edge cases');

  setState('busy', `Running AI test for ${file.name} ...`);
  const result = await fetchJson('/api/v1/analysis/upload', { method: 'POST', body: formData });
  renderUploadAnalysis(result, scenarioName, analysisHint);
  setState('ready', `AI test completed for ${file.name}.`);
}

async function runDataImport() {
  const file = importFileInput.files?.[0];
  const importType = importTypeSelect.value;
  const projectName = importProjectNameInput.value.trim();
  const extraName = importExtraNameInput.value.trim();

  if (!file) throw new Error('Please choose a CSV file before importing.');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('importType', importType);
  formData.append('projectName', projectName || 'AI Test Metrics Dashboard');
  if (importType === 'test-case-repository') formData.append('moduleName', extraName || 'Imported Module');
  if (importType === 'execution-report') formData.append('runName', extraName || `Imported Run ${Date.now()}`);
  if (importType === 'bug-tracking') formData.append('tracker', extraName || 'csv-import');
  if (importType === 'code-repository') formData.append('repository', extraName || 'csv-import');

  setState('busy', `Importing ${file.name}...`);
  const result = await fetchJson('/api/v1/data-sources/import-file', { method: 'POST', body: formData });
  dataImportPreview.textContent = JSON.stringify(result, null, 2);
  await loadDashboard();
  setState('ready', `Imported ${file.name} successfully.`);
}

const metricCard = (label, value, foot) => `<article class="box"><p class="metric-label">${esc(label)}</p><h3 class="metric-value">${esc(value)}</h3><p class="metric-sub">${esc(foot)}</p></article>`;
const barRow = (label, value, valueLabel, tone) => `<div><div class="bar-head"><span>${esc(label)}</span><strong>${esc(valueLabel || pct(value))}</strong></div><div class="bar-track"><div class="fill${tone ? ` ${tone}` : ''}" style="width:${Math.max(0, Math.min(Number(value || 0), 100))}%"></div></div></div>`;
const stackRow = (item) => {
  const total = Number(item.total || 0);
  const passed = Number(item.passed || 0);
  const failed = Number(item.failed || 0);
  const passWidth = total ? (passed / total) * 100 : 0;
  const failWidth = total ? (failed / total) * 100 : 0;
  return `<div><div class="bar-head"><span>${esc(item.runName)}</span><strong>${pct(item.passRate)}</strong></div><div class="stack"><div class="fill teal" style="width:${passWidth}%"></div><div class="fill rose" style="width:${failWidth}%"></div></div><div class="chips" style="margin-top:6px;"><span class="chip">Passed: ${passed}</span><span class="chip">Failed: ${failed}</span><span class="chip">Total: ${total}</span></div></div>`;
};

const sourceCard = (item) => `<article class="source"><div class="source-head"><div><h3>${esc(item.label)}</h3><p class="muted">${esc(item.description)}</p></div><span class="chip">${Number(item.recordCount || 0)} records</span></div><p class="muted section-gap-small"><a href="${esc(item.endpoint)}">${esc(item.endpoint)}</a></p></article>`;
const templateCard = (key, item) => `<article class="source"><div class="source-head"><div><h3>${esc(key)}</h3><p class="muted">Use ${esc(item.method)} ${esc(item.endpoint)} to import data.</p></div><span class="chip">${esc(item.method)}</span></div><div class="preview">${esc(JSON.stringify(item.payload, null, 2))}</div></article>`;
const timelineRows = (items) => items.map((item) => `<div class="timeline-row"><span>${esc(item.label)}</span><strong>${Number(item.value || 0)}</strong></div>`).join('');
const moduleRows = (items) => items.map((item) => `<tr><td><strong>${esc(item.name)}</strong><br><span class="muted">${esc(item.projectName)}</span></td><td>${Number(item.testCaseCount || 0)}</td><td>${pct(item.requirementCoverage)}</td><td>${pct(item.codeCoverage)}</td><td>${pct(item.passRate)}</td><td>${Number(item.openBugs || 0)}</td><td><span class="badge ${esc(item.riskLevel)}">${esc(item.riskLevel)}</span></td></tr>`).join('');
const riskCard = (item) => `<article class="risk-card"><div class="risk-head"><div><h3>${esc(item.name)}</h3><p class="muted">${esc(item.projectName)}</p></div><span class="badge ${esc(item.riskLevel)}">${esc(item.riskScore)}/100</span></div><div class="risk-meta"><div class="mini"><span>Pass Rate</span><strong>${pct(item.passRate)}</strong></div><div class="mini"><span>Code Coverage</span><strong>${pct(item.codeCoverage)}</strong></div><div class="mini"><span>Open Bugs</span><strong>${Number(item.openBugs || 0)}</strong></div></div><div class="chips section-gap-small"><span class="badge ${esc(item.riskLevel)}">${esc(item.riskLevel)} risk</span><span class="chip">Prod bugs: ${Number(item.productionBugs || 0)}</span>${item.insufficientTesting ? '<span class="chip">Insufficient testing</span>' : ''}</div><div class="recommendations section-gap-small">${(item.recommendations || []).map((rec) => `<div class="recommendation">${esc(rec)}</div>`).join('')}</div></article>`;

function populateModuleFilter(modules) {
  const selected = moduleNameSelect.value;
  moduleNameSelect.innerHTML = '<option value="">Module: All</option>' + modules.map((item) => `<option value="${esc(item.name)}">Module: ${esc(item.name)}</option>`).join('');
  const valid = Array.from(moduleNameSelect.options).some((option) => option.value === selected);
  moduleNameSelect.value = valid ? selected : '';
}

function renderDashboard() {
  if (!state.overview) return;
  const { overview, templates, timeFilter, moduleFilter } = state;
  const visibleModules = moduleFilter && moduleFilter.modules ? moduleFilter.modules : overview.modules;
  const visibleTrends = timeFilter && timeFilter.trends ? timeFilter.trends : overview.trends;

  const summary = [
    metricCard('Execution Rate', pct(overview.summary.executionRate), `${overview.summary.totalTestCases} tests scope`),
    metricCard('Pass Ratio', overview.summary.passFailRatio, `${overview.summary.failedTestCases} failing`),
    metricCard('DDP', pct(overview.summary.defectDetectionPercentage), `${overview.summary.testingBugs} found during test`),
    metricCard('Req Coverage', pct(overview.coverage.requirementCoverage), `${overview.summary.totalRequirements} tracked reqs`),
    metricCard('Open Bugs', String(overview.summary.openBugs), `${overview.summary.totalBugs} total defects`)
  ].join('');

  const bugSourceRows = (visibleTrends.bugSources || []).map((item) => {
    const total = Number(overview.summary.totalBugs || 0);
    const value = total ? (Number(item.value || 0) / total) * 100 : 0;
    return barRow(item.label, value, `${item.value} bugs`, String(item.label).toLowerCase() === 'production' ? 'rose' : 'teal');
  }).join('');

  const html = `
    <!-- VIEW: OVERVIEW -->
    <div id="view-overview" class="view" style="display: none;">
      <div class="chips" style="margin-bottom: 24px;">
        <span class="chip">Projects: ${Number(overview.summary.totalProjects || 0)}</span>
        <span class="chip">Modules: ${Number(overview.summary.totalModules || 0)}</span>
        <span class="chip">Runs: ${Number(overview.summary.totalTestRuns || 0)}</span>
      </div>
      <section class="summary">${summary}</section>
      <div class="duo" style="margin-top:24px">
        <article class="box">
          <div class="section-head" style="margin-bottom:0;"><h3>Recent Execution Runs</h3></div>
          <div class="stack-list section-gap-small">${(visibleTrends.recentRuns || []).map(stackRow).join('')}</div>
        </article>
        <article class="box" style="overflow-x:auto;">
          <div class="section-head" style="margin-bottom:0;"><h3>Module Breakdown</h3></div>
          <table><thead><tr><th>Module</th><th>Tests</th><th>Req Cov</th><th>Code Cov</th><th>Pass Rate</th><th>Open Bugs</th><th>Risk</th></tr></thead><tbody>${moduleRows(visibleModules || [])}</tbody></table>
        </article>
      </div>
    </div>

    <!-- VIEW: METRICS -->
    <div id="view-metrics" class="view" style="display: none;">
      <div class="duo">
        <article class="box">
          <h3>Test Effectiveness Metrics</h3>
          <p class="muted">Measurements for efficiency and bug detection</p>
          <div class="bars section-gap-small">
            ${barRow('Test Case Execution Rate', overview.summary.executionRate, pct(overview.summary.executionRate), '')}
            ${barRow('Test Pass Rate', overview.summary.passRate, pct(overview.summary.passRate), 'teal')}
            ${barRow('Defect Detection Percentage (DDP)', overview.summary.defectDetectionPercentage, pct(overview.summary.defectDetectionPercentage), '')}
            ${barRow('Defect Leakage Rate', overview.summary.defectLeakageRate, pct(overview.summary.defectLeakageRate), 'rose')}
          </div>
        </article>
        <article class="box">
          <h3>Coverage Metrics</h3>
          <p class="muted">Requirements, code, and structural coverage</p>
          <div class="bars section-gap-small">
            ${barRow('Requirement Coverage', overview.coverage.requirementCoverage, pct(overview.coverage.requirementCoverage), '')}
            ${barRow('Code Coverage', overview.coverage.codeCoverage, pct(overview.coverage.codeCoverage), 'teal')}
            ${barRow('Test Case Coverage', overview.coverage.testCaseCoverage, pct(overview.coverage.testCaseCoverage), '')}
          </div>
        </article>
      </div>
    </div>

    <!-- VIEW: AI -->
    <div id="view-ai" class="view" style="display: none;">
      <div class="section-head">
        <div>
          <h2 style="font-size: 1.2rem; margin-bottom: 4px;">AI Prescriptive Analytics</h2>
          <p class="muted">${esc(overview.aiInsights.overview)} <br><span style="color:#fcd34d;">(Role: ${currentRole.toUpperCase()})</span></p>
        </div>
        ${currentRole === 'admin' ? '<button id="refresh-ai-btn" class="alt" style="font-size:0.8rem; padding: 8px 12px;">Re-run AI Analysis</button>' : ''}
      </div>
      <div class="risk">
        <article class="box">
          <h3>Risk Areas in the System</h3>
          <div class="recommendations section-gap-small">${(overview.aiInsights.highRiskModules || []).map(riskCard).join('')}</div>
        </article>
        <article class="box">
          <h3>Predictions & Suggested Test Cases</h3>
          <div class="recommendations section-gap-small">${(overview.aiInsights.recommendations || []).map((item) => `<div class="recommendation">${esc(item)}</div>`).join('')}</div>
        </article>
      </div>
      <div id="ai-upload-slot"></div>
    </div>

    <!-- VIEW: DATA -->
    <div id="view-data" class="view" style="display: none;">
      <div class="section-head">
        <div>
          <h2 style="font-size:1.2rem;">Connected Input Sources</h2>
          <p class="muted">Data channels feeding the dashboard logic.</p>
        </div>
      </div>
      <div class="sources">${(overview.inputSources || []).map(sourceCard).join('')}</div>
      <div class="section-head" style="margin-top:24px;">
        <div><h2 style="font-size:1.2rem;">Sample API Payloads</h2></div>
      </div>
      <div class="sources">${Object.keys(templates || {}).map((key) => templateCard(key, templates[key])).join('')}</div>
      <div id="data-import-slot"></div>
    </div>

    <!-- VIEW: REPORTS -->
    <div id="view-reports" class="view" style="display: none;">
      <div class="duo">
        <article class="box">
          <h3>Bug Source Distribution</h3>
          <div class="bars section-gap-small">${bugSourceRows}</div>
        </article>
        <article class="box">
          <h3>Defect Timeline</h3>
          <div class="timeline section-gap-small">${timelineRows(visibleTrends.bugTimeline || [])}</div>
        </article>
      </div>
      <div class="duo" style="margin-top:24px;">
        <article class="box">
          <h3>Export Actions</h3>
          <div class="actions section-gap-small">
            <button id="report-summary">Generate JSON</button>
            <button id="report-pdf" class="alt">Export PDF</button>
          </div>
          <div id="report-preview" class="preview">Choose export to preview.</div>
        </article>
        <article class="box">
          <h3>System Admin</h3>
          <div class="actions section-gap-small">
            <button id="system-users" class="alt">Manage Users</button>
            <button id="system-history" class="alt">View Logs</button>
          </div>
          <div id="system-preview" class="preview">System responses will appear here.</div>
        </article>
      </div>
    </div>
  `;

  app.innerHTML = html;
  applyViewDisplay();
  
  document.getElementById('refresh-ai-btn')?.addEventListener('click', async () => {
    setState('busy', 'Refreshing AI analysis...');
    await fetchJson('/api/v1/analysis/refresh', { method: 'POST', body: JSON.stringify({ projectName: 'AI Test Metrics Dashboard' }), headers: {'Content-Type': 'application/json'} });
    await loadDashboard();
    setState('ready', 'AI analysis refreshed.');
  });
}

function applyViewDisplay() {
  document.querySelectorAll('.view').forEach(v => {
    v.style.display = 'none';
    v.classList.remove('active');
  });
  const activeEl = document.getElementById(currentActiveView);
  if (activeEl) {
    activeEl.style.display = 'block';
    
    if(currentActiveView === 'view-ai') {
      const slot = document.getElementById('ai-upload-slot');
      if(slot) slot.appendChild(aiUploadContainer);
      aiUploadContainer.style.display = 'block';
    } else {
      aiUploadContainer.style.display = 'none';
    }
    
    if(currentActiveView === 'view-data') {
      const slot = document.getElementById('data-import-slot');
      if(slot) slot.appendChild(dataImportContainer);
      dataImportContainer.style.display = 'block';
    } else {
      dataImportContainer.style.display = 'none';
    }
  }
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    currentActiveView = link.getAttribute('data-target');
    currentPageTitle.textContent = link.textContent;
    applyViewDisplay();
  });
});

async function loadDashboard() {
  setState('busy', 'Loading dashboard data...');
  const timeRange = timeRangeSelect.value || 'all';
  const moduleName = moduleNameSelect.value || '';

  try {
    const [overview, templates, timeFilter, moduleFilter] = await Promise.all([
      fetchJson('/api/v1/metrics/overview'),
      fetchJson('/api/v1/data-sources/templates'),
      fetchJson(`/api/v1/metrics/filter/time-range?range=${encodeURIComponent(timeRange)}`),
      fetchJson(`/api/v1/metrics/filter/module?moduleName=${encodeURIComponent(moduleName)}`),
    ]);

    state.overview = overview;
    state.templates = templates;
    state.timeFilter = timeFilter;
    state.moduleFilter = moduleFilter;
    populateModuleFilter(overview.modules || []);
    renderDashboard();
    setState('ready', 'Dashboard loaded.');
  } catch(e) {
    setState('error', e.message);
  }
}

document.getElementById('apply-filters').addEventListener('click', loadDashboard);
document.getElementById('run-upload-analysis').addEventListener('click', runUploadAnalysis);
document.getElementById('run-data-import').addEventListener('click', runDataImport);
importTypeSelect.addEventListener('change', updateImportHints);

app.addEventListener('click', async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const runPreview = async (url, targetId, mode, options) => {
    const t = document.getElementById(targetId);
    if (!t) return;
    try {
      setState('busy', `Calling ${url} ...`);
      const res = await fetchJson(url, options);
      t.textContent = mode === 'content' ? String(res.content || '') : JSON.stringify(res, null, 2);
      setState('ready', 'Completed.');
    } catch (e) {
      t.textContent = e.message;
      setState('error', e.message);
    }
  };

  if (target.id === 'report-summary') await runPreview('/api/v1/reporting/summary', 'report-preview', 'json');
  if (target.id === 'report-pdf') await runPreview('/api/v1/reporting/pdf', 'report-preview', 'content');
  if (target.id === 'system-users') await runPreview('/api/v1/system/users', 'system-preview', 'json');
  if (target.id === 'system-history') await runPreview('/api/v1/system/history', 'system-preview', 'json');
});

updateImportHints();
loadDashboard();
