const app = document.getElementById('app');
const loading = document.getElementById('loading');
const status = document.getElementById('status');
const statusMsg = document.getElementById('status-msg');
const timeRangeSelect = document.getElementById('time-range');
const moduleNameSelect = document.getElementById('module-name');
const authUserInput = document.getElementById('auth-user');
const uploadFileInput = document.getElementById('ai-upload-file');
const uploadNameInput = document.getElementById('ai-upload-name');
const uploadHintInput = document.getElementById('ai-upload-hint');
const uploadAnalysisPreview = document.getElementById('upload-analysis-preview');
const importTypeSelect = document.getElementById('import-type');
const importProjectNameInput = document.getElementById('import-project-name');
const importExtraNameInput = document.getElementById('import-extra-name');
const importFileInput = document.getElementById('import-file');
const importHeaderHintInput = document.getElementById('import-header-hint');
const importExampleHintInput = document.getElementById('import-example-hint');
const dataImportPreview = document.getElementById('data-import-preview');

const state = {
  overview: null,
  templates: null,
  timeFilter: null,
  moduleFilter: null,
};

const importTypeHints = {
  'test-case-repository': {
    extraLabel: 'Module Name',
    extraDefault: 'Admin Panel',
    example:
      'moduleName,testCaseCode,testCaseTitle,requirementCode,requirementTitle',
  },
  'execution-report': {
    extraLabel: 'Run Name',
    extraDefault: 'Sprint Regression',
    example: 'testCaseCode,status,executionTimeSeconds,actualResult',
  },
  'bug-tracking': {
    extraLabel: 'Tracker Name',
    extraDefault: 'jira',
    example: 'bugCode,moduleName,title,severity,priority,source,status',
  },
  'code-repository': {
    extraLabel: 'Repository Name',
    extraDefault: 'measurement-backend',
    example: 'moduleName,coveragePercent,reportDate',
  },
};

const esc = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const pct = (value) => Number(value || 0).toFixed(2).replace(/\.00$/, '') + '%';

const setState = (kind, message) => {
  status.className =
    'status' + (kind === 'busy' ? ' busy' : kind === 'error' ? ' error' : '');
  status.textContent =
    kind === 'busy' ? 'Running' : kind === 'error' ? 'Error' : 'Ready';
  statusMsg.textContent = message;
};

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Request failed with status ' + response.status + ' for ' + url);
  }
  return response.json();
}

function updateImportHints() {
  const importType =
    importTypeSelect instanceof HTMLSelectElement
      ? importTypeSelect.value
      : 'test-case-repository';
  const hint = importTypeHints[importType] ?? importTypeHints['test-case-repository'];

  if (importExtraNameInput instanceof HTMLInputElement) {
    importExtraNameInput.value = hint.extraDefault;
  }
  if (importHeaderHintInput instanceof HTMLInputElement) {
    importHeaderHintInput.value = `Headers should match ${importType}`;
  }
  if (importExampleHintInput instanceof HTMLInputElement) {
    importExampleHintInput.value = hint.example;
  }
}

function renderUploadAnalysis(result, scenarioName, analysisHint) {
  const signals = (result.detectedSignals || [])
    .map((signal) => `- ${signal}`)
    .join('\n');
  const issues = (result.issues || []).map((issue) => `- ${issue}`).join('\n');
  const suggestedTests = (result.suggestedTests || [])
    .map((item) => `- ${item}`)
    .join('\n');

  uploadAnalysisPreview.textContent =
    `Scenario: ${scenarioName || 'Uploaded file analysis'}\n` +
    `Hint: ${analysisHint || 'Find risks, edge cases, and suggested test cases'}\n` +
    `File: ${result.fileName}\n` +
    `Type: ${result.mimeType || 'unknown'}\n` +
    `Size: ${Number(result.size || 0)} bytes\n` +
    `Risk Level: ${result.riskLevel}\n` +
    `Confidence Score: ${Number(result.confidenceScore || 0)}/100\n\n` +
    `Summary\n${result.summary}\n\n` +
    `Detected Signals\n${signals || '- No strong signal detected'}\n\n` +
    `Issues\n${issues || '- No issue reported'}\n\n` +
    `Suggested Tests\n${suggestedTests || '- No suggestion generated'}\n\n` +
    `Preview\n${result.extractedPreview || '(empty preview)'}`;
}

async function runUploadAnalysis() {
  const file =
    uploadFileInput instanceof HTMLInputElement
      ? uploadFileInput.files?.[0]
      : undefined;
  const scenarioName =
    uploadNameInput instanceof HTMLInputElement ? uploadNameInput.value.trim() : '';
  const analysisHint =
    uploadHintInput instanceof HTMLInputElement ? uploadHintInput.value.trim() : '';

  if (!file) {
    throw new Error('Please choose a file before running AI Test.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('scenarioName', scenarioName || 'Uploaded file analysis');
  formData.append(
    'analysisHint',
    analysisHint || 'Find risks, edge cases, and suggested test cases',
  );

  setState('busy', `Running AI test for ${file.name} ...`);
  const result = await fetchJson('/api/v1/analysis/upload', {
    method: 'POST',
    body: formData,
  });
  renderUploadAnalysis(result, scenarioName, analysisHint);
  setState('ready', `AI test completed for ${file.name}.`);
}

async function runDataImport() {
  const file =
    importFileInput instanceof HTMLInputElement
      ? importFileInput.files?.[0]
      : undefined;
  const importType =
    importTypeSelect instanceof HTMLSelectElement
      ? importTypeSelect.value
      : 'test-case-repository';
  const projectName =
    importProjectNameInput instanceof HTMLInputElement
      ? importProjectNameInput.value.trim()
      : 'AI Test Metrics Dashboard';
  const extraName =
    importExtraNameInput instanceof HTMLInputElement
      ? importExtraNameInput.value.trim()
      : '';

  if (!file) {
    throw new Error('Please choose a CSV file before importing.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('importType', importType);
  formData.append('projectName', projectName || 'AI Test Metrics Dashboard');

  if (importType === 'test-case-repository') {
    formData.append('moduleName', extraName || 'Imported Module');
  }
  if (importType === 'execution-report') {
    formData.append('runName', extraName || `Imported Run ${Date.now()}`);
  }
  if (importType === 'bug-tracking') {
    formData.append('tracker', extraName || 'csv-import');
  }
  if (importType === 'code-repository') {
    formData.append('repository', extraName || 'csv-import');
  }

  setState('busy', `Importing ${file.name} into dashboard data...`);
  const result = await fetchJson('/api/v1/data-sources/import-file', {
    method: 'POST',
    body: formData,
  });

  dataImportPreview.textContent = JSON.stringify(result, null, 2);
  await loadDashboard();
  setState('ready', `Imported ${file.name} successfully.`);
}

const metricCard = (label, value, foot) =>
  `<article class="box"><p class="metric-label">${esc(label)}</p><h3 class="metric-value">${esc(value)}</h3><p class="metric-sub">${esc(foot)}</p></article>`;

const barRow = (label, value, valueLabel, tone) =>
  `<div><div class="bar-head"><span>${esc(label)}</span><strong>${esc(valueLabel || pct(value))}</strong></div><div class="bar-track"><div class="fill${tone ? ` ${tone}` : ''}" style="width:${Math.max(0, Math.min(Number(value || 0), 100))}%"></div></div></div>`;

const stackRow = (item) => {
  const total = Number(item.total || 0);
  const passed = Number(item.passed || 0);
  const failed = Number(item.failed || 0);
  const passWidth = total ? (passed / total) * 100 : 0;
  const failWidth = total ? (failed / total) * 100 : 0;

  return `<div><div class="bar-head"><span>${esc(item.runName)}</span><strong>${pct(item.passRate)}</strong></div><div class="stack"><div class="fill teal" style="width:${passWidth}%"></div><div class="fill rose" style="width:${failWidth}%"></div></div><div class="chips"><span class="chip">Passed: ${passed}</span><span class="chip">Failed: ${failed}</span><span class="chip">Total: ${total}</span></div></div>`;
};

const sourceCard = (item) =>
  `<article class="source"><div class="source-head"><div><h3>${esc(item.label)}</h3><p class="muted">${esc(item.description)}</p></div><span class="chip">${Number(item.recordCount || 0)} records</span></div><p class="muted section-gap-small"><a href="${esc(item.endpoint)}">${esc(item.endpoint)}</a></p></article>`;

const templateCard = (key, item) =>
  `<article class="source"><div class="source-head"><div><h3>${esc(key)}</h3><p class="muted">Use ${esc(item.method)} ${esc(item.endpoint)} to import source data.</p></div><span class="chip">${esc(item.method)}</span></div><div class="preview">${esc(JSON.stringify(item.payload, null, 2))}</div></article>`;

const timelineRows = (items) =>
  items
    .map(
      (item) =>
        `<div class="timeline-row"><span>${esc(item.label)}</span><strong>${Number(item.value || 0)}</strong></div>`,
    )
    .join('');

const moduleRows = (items) =>
  items
    .map(
      (item) =>
        `<tr><td><strong>${esc(item.name)}</strong><br><span class="muted">${esc(item.projectName)}</span></td><td>${Number(item.testCaseCount || 0)}</td><td>${pct(item.requirementCoverage)}</td><td>${pct(item.codeCoverage)}</td><td>${pct(item.passRate)}</td><td>${Number(item.openBugs || 0)}</td><td><span class="badge ${esc(item.riskLevel)}">${esc(item.riskLevel)}</span></td></tr>`,
    )
    .join('');

const riskCard = (item) =>
  `<article class="risk-card"><div class="risk-head"><div><h3>${esc(item.name)}</h3><p class="muted">${esc(item.projectName)}</p></div><span class="badge ${esc(item.riskLevel)}">${esc(item.riskScore)}</span></div><div class="risk-meta"><div class="mini"><span>Pass Rate</span><strong>${pct(item.passRate)}</strong></div><div class="mini"><span>Code Coverage</span><strong>${pct(item.codeCoverage)}</strong></div><div class="mini"><span>Open Bugs</span><strong>${Number(item.openBugs || 0)}</strong></div></div><div class="chips section-gap-small"><span class="badge ${esc(item.riskLevel)}">${esc(item.riskLevel)} risk</span><span class="chip">Prod bugs: ${Number(item.productionBugs || 0)}</span>${item.insufficientTesting ? '<span class="chip">Insufficient testing detected</span>' : ''}</div><div class="recommendations section-gap-small">${(item.recommendations || []).map((recommendation) => `<div class="recommendation">${esc(recommendation)}</div>`).join('')}</div></article>`;

function populateModuleFilter(modules) {
  const selected = moduleNameSelect.value;
  moduleNameSelect.innerHTML =
    '<option value="">All modules</option>' +
    modules
      .map((item) => `<option value="${esc(item.name)}">${esc(item.name)}</option>`)
      .join('');

  const valid = Array.from(moduleNameSelect.options).some(
    (option) => option.value === selected,
  );
  moduleNameSelect.value = valid ? selected : '';
}

function renderDashboard() {
  const overview = state.overview;
  const templates = state.templates || {};
  const timeFilter = state.timeFilter;
  const moduleFilter = state.moduleFilter;
  const visibleModules =
    moduleFilter && moduleFilter.modules ? moduleFilter.modules : overview.modules;
  const visibleTrends =
    timeFilter && timeFilter.trends ? timeFilter.trends : overview.trends;

  const summary = [
    metricCard(
      'Test Case Execution Rate',
      pct(overview.summary.executionRate),
      `${overview.summary.totalTestCases} test cases in scope`,
    ),
    metricCard(
      'Test Pass / Fail Ratio',
      overview.summary.passFailRatio,
      `${overview.summary.failedTestCases} cases currently failing`,
    ),
    metricCard(
      'Defect Detection Percentage',
      pct(overview.summary.defectDetectionPercentage),
      `${overview.summary.testingBugs} defects found in testing`,
    ),
    metricCard(
      'Defect Leakage Rate',
      pct(overview.summary.defectLeakageRate),
      `${overview.summary.productionBugs} production defects`,
    ),
    metricCard(
      'Requirement Coverage',
      pct(overview.coverage.requirementCoverage),
      `${overview.summary.totalRequirements} tracked requirements`,
    ),
    metricCard(
      'Code Coverage',
      pct(overview.coverage.codeCoverage),
      `${overview.summary.avgExecutionTimeSeconds}s avg execution time`,
    ),
    metricCard(
      'Test Case Coverage',
      pct(overview.coverage.testCaseCoverage),
      `${overview.summary.totalModules} modules in scope`,
    ),
    metricCard(
      'Open Bugs',
      String(overview.summary.openBugs),
      `${overview.summary.totalBugs} total known defects`,
    ),
  ].join('');

  const bugSourceRows = (visibleTrends.bugSources || [])
    .map((item) => {
      const total = Number(overview.summary.totalBugs || 0);
      const value = total ? (Number(item.value || 0) / total) * 100 : 0;
      return barRow(
        item.label,
        value,
        `${item.value} bugs`,
        String(item.label).toLowerCase() === 'production' ? 'rose' : 'teal',
      );
    })
    .join('');

  app.innerHTML =
    `<section class="section-head"><div><h2>Overview</h2><p class="muted">This view is organized exactly like the requirement sheet: Input, Processing, AI Component, and Output.</p></div><div class="chips"><span class="chip">Projects: ${Number(overview.summary.totalProjects || 0)}</span><span class="chip">Modules: ${Number(overview.summary.totalModules || 0)}</span><span class="chip">Runs: ${Number(overview.summary.totalTestRuns || 0)}</span></div></section>` +
    `<section class="summary">${summary}</section>` +
    `<section class="panel"><div class="section-head"><div><h2>Input</h2><p class="muted">Required input channels feeding the dashboard.</p></div><div class="chips"><span class="chip">Templates: /api/v1/data-sources/templates</span></div></div><div class="sources">${(overview.inputSources || []).map(sourceCard).join('')}</div><div class="section-head" style="margin-top:18px"><div><h2>Sample Import Payloads</h2><p class="muted">Example payloads that match the brief.</p></div></div><div class="sources">${Object.keys(templates).map((key) => templateCard(key, templates[key])).join('')}</div></section>` +
    `<section class="panel"><div class="section-head"><div><h2>Processing</h2><p class="muted">Effectiveness metrics and coverage metrics calculated from source data.</p></div><div class="chips"><span class="chip">Time range: ${esc(timeRangeSelect.value || 'all')}</span><span class="chip">Module: ${esc(moduleFilter ? moduleFilter.moduleName : 'all')}</span></div></div><div class="duo"><article class="box"><h3>Test Effectiveness Metrics</h3><div class="bars section-gap-small">${barRow('Test Case Execution Rate', overview.summary.executionRate, pct(overview.summary.executionRate), '')}${barRow('Test Pass Rate', overview.summary.passRate, pct(overview.summary.passRate), 'teal')}${barRow('Defect Detection Percentage (DDP)', overview.summary.defectDetectionPercentage, pct(overview.summary.defectDetectionPercentage), '')}${barRow('Defect Leakage Rate', overview.summary.defectLeakageRate, pct(overview.summary.defectLeakageRate), 'rose')}</div></article><article class="box"><h3>Coverage Metrics</h3><div class="bars section-gap-small">${barRow('Requirement Coverage', overview.coverage.requirementCoverage, pct(overview.coverage.requirementCoverage), '')}${barRow('Code Coverage', overview.coverage.codeCoverage, pct(overview.coverage.codeCoverage), 'teal')}${barRow('Test Case Coverage', overview.coverage.testCaseCoverage, pct(overview.coverage.testCaseCoverage), '')}</div></article></div><div class="duo" style="margin-top:18px"><article class="box"><h3>Recent Execution Runs</h3><div class="stack-list section-gap-small">${(visibleTrends.recentRuns || []).map(stackRow).join('')}</div></article><article class="box"><h3>Module Breakdown</h3><table style="margin-top:12px"><thead><tr><th>Module</th><th>Tests</th><th>Req Cov</th><th>Code Cov</th><th>Pass Rate</th><th>Open Bugs</th><th>Risk</th></tr></thead><tbody>${moduleRows(visibleModules || [])}</tbody></table></article></div></section>` +
    `<section class="panel"><div class="section-head"><div><h2>AI Component</h2><p class="muted">${esc(overview.aiInsights.overview)}</p></div><div class="chips"><span class="chip">Refresh: /api/v1/analysis/refresh</span><span class="chip">High-risk modules: ${Number((overview.aiInsights.highRiskModules || []).length)}</span></div></div><div class="risk"><article class="box"><h3>Risk Areas in the System</h3><div class="recommendations section-gap-small">${(overview.aiInsights.highRiskModules || []).map(riskCard).join('')}</div></article><article class="box"><h3>Predictions and Suggested Additional Test Cases</h3><div class="recommendations section-gap-small">${(overview.aiInsights.recommendations || []).map((item) => `<div class="recommendation">${esc(item)}</div>`).join('')}</div><p class="muted section-gap-small">Supporting APIs: <a href="/api/v1/analysis/low-coverage">low coverage</a>, <a href="/api/v1/analysis/failure-predictions">failure predictions</a>, <a href="/api/v1/analysis/suggestions">suggestions</a>, <a href="/api/v1/analysis/risk-areas">risk areas</a></p></article></div></section>` +
    `<section class="panel"><div class="section-head"><div><h2>Output</h2><p class="muted">Interactive dashboard outputs for testing effectiveness, coverage, defect detection trends, and system risk areas.</p></div><div class="chips"><span class="chip">Open bugs: ${Number(overview.summary.openBugs || 0)}</span><span class="chip">Total bugs: ${Number(overview.summary.totalBugs || 0)}</span></div></div><div class="duo"><article class="box"><h3>Bug Source Distribution</h3><div class="bars section-gap-small">${bugSourceRows}</div></article><article class="box"><h3>Defect Timeline</h3><div class="timeline section-gap-small">${timelineRows(visibleTrends.bugTimeline || [])}</div></article></div><div class="duo" style="margin-top:18px"><article class="box"><h3>Reporting</h3><div class="actions section-gap-small"><button id="report-summary">Generate Summary Report</button><button id="report-excel" class="alt">Export Excel</button><button id="report-pdf" class="alt">Export PDF</button></div><div id="report-preview" class="preview">Choose a reporting action to preview output here.</div></article><article class="box"><h3>System Access</h3><div class="actions section-gap-small"><button id="system-login">Login</button><button id="system-users" class="alt">Manage Users</button><button id="system-history" class="alt">View History</button></div><div id="system-preview" class="preview">Use the default admin account or your own credentials.</div></article></div></section>`;
}

async function loadDashboard() {
  setState('busy', 'Loading live dashboard data...');
  const timeRange = timeRangeSelect.value || 'all';
  const moduleName = moduleNameSelect.value || '';

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
  setState('ready', 'Dashboard loaded from live NestJS APIs.');
}

async function runPreview(url, targetId, mode, options) {
  const target = document.getElementById(targetId);
  if (!target) {
    return;
  }

  try {
    setState('busy', `Calling ${url} ...`);
    const result = await fetchJson(url, options);
    target.textContent =
      mode === 'content' ? String(result.content || '') : JSON.stringify(result, null, 2);
    setState('ready', 'Action completed successfully.');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    target.textContent = message;
    setState('error', message);
  }
}

document.getElementById('apply-filters').addEventListener('click', async () => {
  try {
    await loadDashboard();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    loading.textContent = message;
    setState('error', message);
  }
});

document.getElementById('reload-dashboard').addEventListener('click', async () => {
  try {
    await loadDashboard();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    loading.textContent = message;
    setState('error', message);
  }
});

document.getElementById('refresh-ai').addEventListener('click', async () => {
  try {
    setState('busy', 'Refreshing AI analysis...');
    await fetchJson('/api/v1/analysis/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectName: 'AI Test Metrics Dashboard' }),
    });
    await loadDashboard();
    setState('ready', 'AI analysis refreshed.');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setState('error', message);
  }
});

document
  .getElementById('run-upload-analysis')
  .addEventListener('click', async () => {
    try {
      await runUploadAnalysis();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      uploadAnalysisPreview.textContent = message;
      setState('error', message);
    }
  });

if (importTypeSelect instanceof HTMLSelectElement) {
  importTypeSelect.addEventListener('change', updateImportHints);
  updateImportHints();
}

document.getElementById('run-data-import').addEventListener('click', async () => {
  try {
    await runDataImport();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    dataImportPreview.textContent = message;
    setState('error', message);
  }
});

app.addEventListener('click', async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const username =
    authUserInput instanceof HTMLInputElement ? authUserInput.value : 'admin';

  if (target.id === 'report-summary') {
    await runPreview('/api/v1/reporting/summary', 'report-preview', 'json');
  }
  if (target.id === 'report-excel') {
    await runPreview('/api/v1/reporting/excel', 'report-preview', 'content');
  }
  if (target.id === 'report-pdf') {
    await runPreview('/api/v1/reporting/pdf', 'report-preview', 'content');
  }
  if (target.id === 'system-login') {
    await runPreview('/api/v1/system/login', 'system-preview', 'json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password: 'admin123' }),
    });
  }
  if (target.id === 'system-users') {
    await runPreview('/api/v1/system/users', 'system-preview', 'json');
  }
  if (target.id === 'system-history') {
    await runPreview('/api/v1/system/history', 'system-preview', 'json');
  }
});

loadDashboard().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  loading.textContent = message;
  setState('error', message);
});
