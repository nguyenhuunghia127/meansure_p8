"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    renderDashboard() {
        return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>P8 AI Test Metrics Dashboard</title>
  <style>
    :root{--ink:#11243d;--muted:#617286;--line:rgba(17,36,61,.12);--paper:rgba(255,255,255,.9);--sky:#2d6cdf;--teal:#11806a;--amber:#b87400;--rose:#bf3558;--bg:#f5f1e6;--bg2:#eef5fb}
    *{box-sizing:border-box}body{margin:0;font-family:Georgia,"Times New Roman",serif;color:var(--ink);background:radial-gradient(circle at top left,rgba(45,108,223,.16),transparent 28%),linear-gradient(145deg,var(--bg),var(--bg2));min-height:100vh}
    .page{width:min(1240px,calc(100% - 28px));margin:20px auto 40px}.hero,.panel{background:var(--paper);border:1px solid var(--line);border-radius:26px;box-shadow:0 24px 60px rgba(17,36,61,.14)}
    .hero{padding:28px}.panel{padding:22px;margin-top:18px}.tag,.chip,.status,.badge{display:inline-flex;align-items:center;border-radius:999px;font-weight:700}
    .tag{padding:8px 12px;background:#fff0c9;color:#8d5f00;font-size:12px;letter-spacing:.12em;text-transform:uppercase}.chip,.status,.badge{padding:7px 11px;font-size:12px}
    .chip{background:#edf3ff;color:#2159c8}.status{background:rgba(17,128,106,.12);color:var(--teal)}.status.busy{background:rgba(184,116,0,.14);color:var(--amber)}.status.error{background:rgba(191,53,88,.12);color:var(--rose)}
    .badge.high{background:rgba(191,53,88,.12);color:var(--rose)}.badge.medium{background:rgba(184,116,0,.16);color:var(--amber)}.badge.low{background:rgba(17,128,106,.12);color:var(--teal)}
    h1{margin:14px 0 10px;max-width:960px;font-size:clamp(34px,6vw,62px);line-height:.95}h2,h3,p{margin:0}.muted{color:var(--muted);line-height:1.6}
    .hero-grid,.summary,.duo,.sources,.risk,.form-grid,.actions,.chips,.bars,.stack-list,.timeline,.recommendations{display:grid;gap:14px}
    .hero-grid{grid-template-columns:1.35fr .95fr;margin-top:22px}.summary{grid-template-columns:repeat(auto-fit,minmax(170px,1fr))}.duo{grid-template-columns:1fr 1fr}.sources{grid-template-columns:repeat(2,minmax(0,1fr))}.risk{grid-template-columns:1.1fr .9fr}.form-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
    .actions,.chips{display:flex;flex-wrap:wrap}.card,.box,.source,.risk-card{padding:18px;border:1px solid var(--line);background:#fff;border-radius:20px}
    .section-head,.row,.source-head,.risk-head{display:flex;justify-content:space-between;gap:12px}.section-head{align-items:end;margin-bottom:16px}.row,.source-head,.risk-head{align-items:start}
    .metric-label{color:var(--muted);font-size:12px;letter-spacing:.08em;text-transform:uppercase}.metric-value{margin-top:10px;font-size:clamp(28px,4vw,42px);line-height:1}.metric-sub{margin-top:8px;color:var(--muted);font-size:14px}
    .field{display:grid;gap:6px}.field label{color:var(--muted);font-size:12px;letter-spacing:.06em;text-transform:uppercase}.field input,.field select{width:100%;padding:11px 12px;border:1px solid var(--line);border-radius:14px;font:inherit;background:#fff}
    button{border:none;border-radius:14px;padding:12px 16px;font:inherit;font-weight:700;cursor:pointer;color:#fff;background:linear-gradient(135deg,var(--sky),#2459d8)}button.alt{color:var(--ink);background:#f7f9fc;border:1px solid var(--line)}
    .bar-track,.stack{height:12px;border-radius:999px;background:#e9eef6;overflow:hidden}.stack{height:14px;display:flex}.fill{height:100%;background:linear-gradient(90deg,var(--sky),#8ab3ff)}.fill.teal{background:linear-gradient(90deg,var(--teal),#46c7b6)}.fill.rose{background:linear-gradient(90deg,var(--rose),#f08ea7)}
    .bar-head,.timeline-row{display:flex;justify-content:space-between;gap:10px;font-size:14px}.timeline-row{padding:10px 0;border-bottom:1px solid var(--line)}
    table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:12px 10px;border-bottom:1px solid var(--line);font-size:14px}th{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
    .risk-meta{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px}.mini{padding:12px;border:1px solid var(--line);background:#f6f9fc;border-radius:14px}.mini span{display:block;color:var(--muted);font-size:12px;text-transform:uppercase}.mini strong{display:block;margin-top:6px;font-size:22px}
    .recommendation{padding:14px 16px;border-radius:16px;background:#fff8e7;border:1px solid rgba(184,116,0,.18);line-height:1.55}.preview{margin-top:14px;min-height:160px;padding:14px;border-radius:18px;background:#0f172a;color:#dce9ff;white-space:pre-wrap;overflow:auto;font-size:12px;line-height:1.6}
    .loading{padding:22px;border-radius:20px;border:1px dashed var(--line);background:rgba(255,255,255,.8);color:var(--muted)}
    a{color:var(--sky);text-decoration:none;font-weight:700}
    @media (max-width:960px){.hero-grid,.duo,.sources,.risk,.form-grid,.risk-meta{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <main class="page">
    <section class="hero">
      <span class="tag">P8 Software Quality Assessment</span>
      <h1>AI-based Test Metrics Dashboard for Software Quality Assessment</h1>
      <p class="muted">This dashboard follows your brief directly: Input sources, Processing metrics, AI component, and Output views for testing effectiveness, coverage, defect trends, and risk areas.</p>
      <div class="hero-grid">
        <article class="card">
          <h3>Objective</h3>
          <p class="muted" style="margin-top:10px">Measure software testing effectiveness using live project data from test repositories, execution reports, bug tracking, and code coverage with AI-assisted analysis layered on top.</p>
          <div class="recommendations" style="margin-top:14px">
            <div class="recommendation">Input: test case repositories, test execution reports, bug tracking systems, and code repository signals.</div>
            <div class="recommendation">Processing: execution rate, pass/fail ratio, DDP, leakage, requirement coverage, code coverage, and test case coverage.</div>
            <div class="recommendation">AI: detect insufficient testing, predict risky modules, and suggest extra test cases.</div>
          </div>
        </article>
        <article class="card">
          <h3>Controls</h3>
          <div class="form-grid" style="margin-top:14px">
            <div class="field">
              <label for="time-range">Time Range</label>
              <select id="time-range">
                <option value="all">All</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
            <div class="field">
              <label for="module-name">Module</label>
              <select id="module-name"><option value="">All modules</option></select>
            </div>
            <div class="field">
              <label for="auth-user">Username</label>
              <input id="auth-user" value="admin" />
            </div>
          </div>
          <div class="actions" style="margin-top:14px">
            <button id="apply-filters">Apply Filters</button>
            <button id="refresh-ai">Refresh AI Analysis</button>
            <button id="reload-dashboard" class="alt">Reload Dashboard</button>
          </div>
          <div class="chips" style="margin-top:14px">
            <span id="status" class="status">Ready</span>
            <span class="chip">/api/v1/metrics/overview</span>
          </div>
          <p id="status-msg" class="muted" style="margin-top:12px">Waiting to load live data from the NestJS API.</p>
        </article>
      </div>
    </section>
    <section id="app" class="panel">
      <div id="loading" class="loading">Loading dashboard data...</div>
    </section>
  </main>
  <script>
    const app = document.getElementById('app');
    const loading = document.getElementById('loading');
    const status = document.getElementById('status');
    const statusMsg = document.getElementById('status-msg');
    const timeRangeSelect = document.getElementById('time-range');
    const moduleNameSelect = document.getElementById('module-name');
    const authUserInput = document.getElementById('auth-user');

    const state = { overview: null, templates: null, timeFilter: null, moduleFilter: null };

    const esc = (value) => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#39;");
    const pct = (value) => Number(value || 0).toFixed(2).replace(/\\.00$/, '') + '%';
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
    const metricCard = (label, value, foot) => '<article class="box"><p class="metric-label">' + esc(label) + '</p><h3 class="metric-value">' + esc(value) + '</h3><p class="metric-sub">' + esc(foot) + '</p></article>';
    const barRow = (label, value, valueLabel, tone) => '<div><div class="bar-head"><span>' + esc(label) + '</span><strong>' + esc(valueLabel || pct(value)) + '</strong></div><div class="bar-track"><div class="fill' + (tone ? ' ' + tone : '') + '" style="width:' + Math.max(0, Math.min(Number(value || 0), 100)) + '%"></div></div></div>';
    const stackRow = (item) => {
      const total = Number(item.total || 0);
      const passed = Number(item.passed || 0);
      const failed = Number(item.failed || 0);
      const passWidth = total ? (passed / total) * 100 : 0;
      const failWidth = total ? (failed / total) * 100 : 0;
      return '<div><div class="bar-head"><span>' + esc(item.runName) + '</span><strong>' + pct(item.passRate) + '</strong></div><div class="stack"><div class="fill teal" style="width:' + passWidth + '%"></div><div class="fill rose" style="width:' + failWidth + '%"></div></div><div class="chips"><span class="chip">Passed: ' + passed + '</span><span class="chip">Failed: ' + failed + '</span><span class="chip">Total: ' + total + '</span></div></div>';
    };
    const sourceCard = (item) => '<article class="source"><div class="source-head"><div><h3>' + esc(item.label) + '</h3><p class="muted">' + esc(item.description) + '</p></div><span class="chip">' + Number(item.recordCount || 0) + ' records</span></div><p class="muted" style="margin-top:12px"><a href="' + esc(item.endpoint) + '">' + esc(item.endpoint) + '</a></p></article>';
    const templateCard = (key, item) => '<article class="source"><div class="source-head"><div><h3>' + esc(key) + '</h3><p class="muted">Use ' + esc(item.method) + ' ' + esc(item.endpoint) + ' to import source data.</p></div><span class="chip">' + esc(item.method) + '</span></div><div class="preview">' + esc(JSON.stringify(item.payload, null, 2)) + '</div></article>';
    const timelineRows = (items) => items.map((item) => '<div class="timeline-row"><span>' + esc(item.label) + '</span><strong>' + Number(item.value || 0) + '</strong></div>').join('');
    const moduleRows = (items) => items.map((item) => '<tr><td><strong>' + esc(item.name) + '</strong><br><span class="muted">' + esc(item.projectName) + '</span></td><td>' + Number(item.testCaseCount || 0) + '</td><td>' + pct(item.requirementCoverage) + '</td><td>' + pct(item.codeCoverage) + '</td><td>' + pct(item.passRate) + '</td><td>' + Number(item.openBugs || 0) + '</td><td><span class="badge ' + esc(item.riskLevel) + '">' + esc(item.riskLevel) + '</span></td></tr>').join('');
    const riskCard = (item) => '<article class="risk-card"><div class="risk-head"><div><h3>' + esc(item.name) + '</h3><p class="muted">' + esc(item.projectName) + '</p></div><span class="badge ' + esc(item.riskLevel) + '">' + esc(item.riskScore) + '</span></div><div class="risk-meta"><div class="mini"><span>Pass Rate</span><strong>' + pct(item.passRate) + '</strong></div><div class="mini"><span>Code Coverage</span><strong>' + pct(item.codeCoverage) + '</strong></div><div class="mini"><span>Open Bugs</span><strong>' + Number(item.openBugs || 0) + '</strong></div></div><div class="chips" style="margin-top:14px"><span class="badge ' + esc(item.riskLevel) + '">' + esc(item.riskLevel) + ' risk</span><span class="chip">Prod bugs: ' + Number(item.productionBugs || 0) + '</span>' + (item.insufficientTesting ? '<span class="chip">Insufficient testing detected</span>' : '') + '</div><div class="recommendations" style="margin-top:14px">' + (item.recommendations || []).map((rec) => '<div class="recommendation">' + esc(rec) + '</div>').join('') + '</div></article>';

    function populateModuleFilter(modules) {
      const selected = moduleNameSelect.value;
      moduleNameSelect.innerHTML = '<option value="">All modules</option>' + modules.map((item) => '<option value="' + esc(item.name) + '">' + esc(item.name) + '</option>').join('');
      const valid = [].slice.call(moduleNameSelect.options).some((option) => option.value === selected);
      moduleNameSelect.value = valid ? selected : '';
    }

    function renderDashboard() {
      const overview = state.overview;
      const templates = state.templates || {};
      const timeFilter = state.timeFilter;
      const moduleFilter = state.moduleFilter;
      const visibleModules = moduleFilter && moduleFilter.modules ? moduleFilter.modules : overview.modules;
      const visibleTrends = timeFilter && timeFilter.trends ? timeFilter.trends : overview.trends;

      const summary = [
        metricCard('Test Case Execution Rate', pct(overview.summary.executionRate), overview.summary.totalTestCases + ' test cases in scope'),
        metricCard('Test Pass / Fail Ratio', overview.summary.passFailRatio, overview.summary.failedTestCases + ' cases currently failing'),
        metricCard('Defect Detection Percentage', pct(overview.summary.defectDetectionPercentage), overview.summary.testingBugs + ' defects found in testing'),
        metricCard('Defect Leakage Rate', pct(overview.summary.defectLeakageRate), overview.summary.productionBugs + ' production defects'),
        metricCard('Requirement Coverage', pct(overview.coverage.requirementCoverage), overview.summary.totalRequirements + ' tracked requirements'),
        metricCard('Code Coverage', pct(overview.coverage.codeCoverage), overview.summary.avgExecutionTimeSeconds + 's avg execution time'),
        metricCard('Test Case Coverage', pct(overview.coverage.testCaseCoverage), overview.summary.totalModules + ' modules in scope'),
        metricCard('Open Bugs', String(overview.summary.openBugs), overview.summary.totalBugs + ' total known defects'),
      ].join('');

      app.innerHTML =
        '<section class="section-head"><div><h2>Overview</h2><p class="muted">This view is organized exactly like the requirement sheet: Input, Processing, AI Component, and Output.</p></div><div class="chips"><span class="chip">Projects: ' + Number(overview.summary.totalProjects || 0) + '</span><span class="chip">Modules: ' + Number(overview.summary.totalModules || 0) + '</span><span class="chip">Runs: ' + Number(overview.summary.totalTestRuns || 0) + '</span></div></section>' +
        '<section class="summary">' + summary + '</section>' +
        '<section class="panel"><div class="section-head"><div><h2>Input</h2><p class="muted">Required input channels feeding the dashboard.</p></div><div class="chips"><span class="chip">Templates: /api/v1/data-sources/templates</span></div></div><div class="sources">' + (overview.inputSources || []).map(sourceCard).join('') + '</div><div class="section-head" style="margin-top:18px"><div><h2>Sample Import Payloads</h2><p class="muted">Example payloads that match the brief.</p></div></div><div class="sources">' + Object.keys(templates).map((key) => templateCard(key, templates[key])).join('') + '</div></section>' +
        '<section class="panel"><div class="section-head"><div><h2>Processing</h2><p class="muted">Effectiveness metrics and coverage metrics calculated from source data.</p></div><div class="chips"><span class="chip">Time range: ' + esc(timeRangeSelect.value || 'all') + '</span><span class="chip">Module: ' + esc(moduleFilter ? moduleFilter.moduleName : 'all') + '</span></div></div><div class="duo"><article class="box"><h3>Test Effectiveness Metrics</h3><div class="bars" style="margin-top:14px">' + barRow('Test Case Execution Rate', overview.summary.executionRate, pct(overview.summary.executionRate), '') + barRow('Test Pass Rate', overview.summary.passRate, pct(overview.summary.passRate), 'teal') + barRow('Defect Detection Percentage (DDP)', overview.summary.defectDetectionPercentage, pct(overview.summary.defectDetectionPercentage), '') + barRow('Defect Leakage Rate', overview.summary.defectLeakageRate, pct(overview.summary.defectLeakageRate), 'rose') + '</div></article><article class="box"><h3>Coverage Metrics</h3><div class="bars" style="margin-top:14px">' + barRow('Requirement Coverage', overview.coverage.requirementCoverage, pct(overview.coverage.requirementCoverage), '') + barRow('Code Coverage', overview.coverage.codeCoverage, pct(overview.coverage.codeCoverage), 'teal') + barRow('Test Case Coverage', overview.coverage.testCaseCoverage, pct(overview.coverage.testCaseCoverage), '') + '</div></article></div><div class="duo" style="margin-top:18px"><article class="box"><h3>Recent Execution Runs</h3><div class="stack-list" style="margin-top:14px">' + (visibleTrends.recentRuns || []).map(stackRow).join('') + '</div></article><article class="box"><h3>Module Breakdown</h3><table style="margin-top:12px"><thead><tr><th>Module</th><th>Tests</th><th>Req Cov</th><th>Code Cov</th><th>Pass Rate</th><th>Open Bugs</th><th>Risk</th></tr></thead><tbody>' + moduleRows(visibleModules || []) + '</tbody></table></article></div></section>' +
        '<section class="panel"><div class="section-head"><div><h2>AI Component</h2><p class="muted">' + esc(overview.aiInsights.overview) + '</p></div><div class="chips"><span class="chip">Refresh: /api/v1/analysis/refresh</span><span class="chip">High-risk modules: ' + Number((overview.aiInsights.highRiskModules || []).length) + '</span></div></div><div class="risk"><article class="box"><h3>Risk Areas in the System</h3><div class="recommendations" style="margin-top:14px">' + (overview.aiInsights.highRiskModules || []).map(riskCard).join('') + '</div></article><article class="box"><h3>Predictions and Suggested Additional Test Cases</h3><div class="recommendations" style="margin-top:14px">' + (overview.aiInsights.recommendations || []).map((item) => '<div class="recommendation">' + esc(item) + '</div>').join('') + '</div><p class="muted" style="margin-top:14px">Supporting APIs: <a href="/api/v1/analysis/low-coverage">low coverage</a>, <a href="/api/v1/analysis/failure-predictions">failure predictions</a>, <a href="/api/v1/analysis/suggestions">suggestions</a>, <a href="/api/v1/analysis/risk-areas">risk areas</a></p></article></div></section>' +
        '<section class="panel"><div class="section-head"><div><h2>Output</h2><p class="muted">Interactive dashboard outputs for testing effectiveness, coverage, defect detection trends, and system risk areas.</p></div><div class="chips"><span class="chip">Open bugs: ' + Number(overview.summary.openBugs || 0) + '</span><span class="chip">Total bugs: ' + Number(overview.summary.totalBugs || 0) + '</span></div></div><div class="duo"><article class="box"><h3>Bug Source Distribution</h3><div class="bars" style="margin-top:14px">' + (visibleTrends.bugSources || []).map((item) => {
          const total = Number(overview.summary.totalBugs || 0);
          const value = total ? (Number(item.value || 0) / total) * 100 : 0;
          return barRow(item.label, value, String(item.value) + ' bugs', String(item.label).toLowerCase() === 'production' ? 'rose' : 'teal');
        }).join('') + '</div></article><article class="box"><h3>Defect Timeline</h3><div class="timeline" style="margin-top:14px">' + timelineRows(visibleTrends.bugTimeline || []) + '</div></article></div><div class="duo" style="margin-top:18px"><article class="box"><h3>Reporting</h3><div class="actions" style="margin-top:14px"><button id="report-summary">Generate Summary Report</button><button id="report-excel" class="alt">Export Excel</button><button id="report-pdf" class="alt">Export PDF</button></div><div id="report-preview" class="preview">Choose a reporting action to preview output here.</div></article><article class="box"><h3>System Access</h3><div class="actions" style="margin-top:14px"><button id="system-login">Login</button><button id="system-users" class="alt">Manage Users</button><button id="system-history" class="alt">View History</button></div><div id="system-preview" class="preview">Use the default admin account or your own credentials.</div></article></div></section>';
    }

    async function loadDashboard() {
      setState('busy', 'Loading live dashboard data...');
      const timeRange = timeRangeSelect.value || 'all';
      const moduleName = moduleNameSelect.value || '';
      const [overview, templates, timeFilter, moduleFilter] = await Promise.all([
        fetchJson('/api/v1/metrics/overview'),
        fetchJson('/api/v1/data-sources/templates'),
        fetchJson('/api/v1/metrics/filter/time-range?range=' + encodeURIComponent(timeRange)),
        fetchJson('/api/v1/metrics/filter/module?moduleName=' + encodeURIComponent(moduleName)),
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
      if (!target) return;
      try {
        setState('busy', 'Calling ' + url + ' ...');
        const result = await fetchJson(url, options);
        target.textContent = mode === 'content' ? String(result.content || '') : JSON.stringify(result, null, 2);
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

    app.addEventListener('click', async (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const username = authUserInput instanceof HTMLInputElement ? authUserInput.value : 'admin';

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
  </script>
</body>
</html>`;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map