import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SystemService } from '../system/system.service';

type ImportPayload = Record<string, unknown>;
type UploadedImportFile = {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
};

@Injectable()
export class DataSourcesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly systemService: SystemService,
  ) {}

  getTemplates() {
    return {
      testCaseRepository: {
        endpoint: '/api/v1/data-sources/test-case-repositories',
        method: 'POST',
        payload: {
          projectName: 'AI Test Metrics Dashboard',
          moduleName: 'Admin Panel',
          requirements: [
            {
              code: 'REQ-006',
              title: 'Manage user roles',
              description: 'Admin can assign roles to users',
              priority: 'high',
              testCaseCodes: ['TC-006'],
            },
          ],
          testCases: [
            {
              code: 'TC-006',
              title: 'Assign role to a user',
              description: 'Verify role assignment succeeds',
              testType: 'functional',
              priority: 'high',
            },
          ],
        },
      },
      executionReport: {
        endpoint: '/api/v1/data-sources/execution-reports',
        method: 'POST',
        payload: {
          projectName: 'AI Test Metrics Dashboard',
          runName: 'Sprint 3 Regression',
          environment: 'staging',
          executedBy: 'qa-team',
          results: [
            {
              testCaseCode: 'TC-006',
              status: 'passed',
              executionTimeSeconds: 12,
              actualResult: 'Role updated successfully',
            },
          ],
        },
      },
      bugTracking: {
        endpoint: '/api/v1/data-sources/bug-tracking',
        method: 'POST',
        payload: {
          projectName: 'AI Test Metrics Dashboard',
          tracker: 'jira',
          issues: [
            {
              bugCode: 'BUG-004',
              moduleName: 'Admin Panel',
              testCaseCode: 'TC-006',
              title: 'Role assignment fails for invited users',
              description: 'Jira issue imported from bug tracker',
              severity: 'high',
              priority: 'high',
              source: 'testing',
              status: 'open',
            },
          ],
        },
      },
      codeRepository: {
        endpoint: '/api/v1/data-sources/code-repository',
        method: 'POST',
        payload: {
          projectName: 'AI Test Metrics Dashboard',
          repository: 'measurement-backend',
          coverage: [
            {
              moduleName: 'Admin Panel',
              coveragePercent: 77,
              reportDate: '2026-04-13',
            },
          ],
        },
      },
      aiRefresh: {
        endpoint: '/api/v1/analysis/refresh',
        method: 'POST',
        payload: {
          projectName: 'AI Test Metrics Dashboard',
        },
      },
      csvImport: {
        endpoint: '/api/v1/data-sources/import-file',
        method: 'POST',
        payload: {
          importType: 'test-case-repository',
          projectName: 'AI Test Metrics Dashboard',
          moduleName: 'Admin Panel',
          file: 'CSV upload with headers matching the selected import type',
        },
      },
    };
  }

  async importFromStructuredFile(
    file: UploadedImportFile,
    meta: {
      importType?: string;
      projectName?: string;
      moduleName?: string;
      runName?: string;
      tracker?: string;
      repository?: string;
    },
  ) {
    const extension = file.originalname.split('.').pop()?.toLowerCase() ?? '';
    if (extension !== 'csv') {
      return {
        imported: false,
        fileName: file.originalname,
        importType: meta.importType ?? 'unknown',
        message:
          'This MVP import flow currently supports CSV files. XLSX can be added next with a spreadsheet parser package.',
      };
    }

    const rows = this.parseCsv(file.buffer.toString('utf8'));
    const importType = (meta.importType ?? '').trim().toLowerCase();

    if (!rows.length) {
      return {
        imported: false,
        fileName: file.originalname,
        importType: importType || 'unknown',
        message: 'The CSV file has no data rows to import.',
      };
    }

    let result: Record<string, unknown>;

    if (importType === 'test-case-repository') {
      result = await this.importTestCasesFromRows(rows, meta);
    } else if (importType === 'execution-report') {
      result = await this.importExecutionFromRows(rows, meta);
    } else if (importType === 'bug-tracking') {
      result = await this.importBugTrackingFromRows(rows, meta);
    } else if (importType === 'code-repository') {
      result = await this.importCoverageFromRows(rows, meta);
    } else {
      return {
        imported: false,
        fileName: file.originalname,
        importType: importType || 'unknown',
        supportedTypes: [
          'test-case-repository',
          'execution-report',
          'bug-tracking',
          'code-repository',
        ],
        message: 'Unsupported import type.',
      };
    }

    await this.systemService.recordHistory(
      'file-import',
      `Imported ${rows.length} CSV rows for ${importType} from ${file.originalname}`,
    );

    return {
      imported: true,
      fileName: file.originalname,
      importType,
      rowCount: rows.length,
      ...result,
    };
  }

  async importTestCases(payload: ImportPayload) {
    const result = await this.importTestCaseRepository(payload);
    await this.systemService.recordHistory(
      'input',
      `Imported test cases for ${result.moduleName}`,
    );
    return result;
  }

  async importTestCaseRepository(payload: ImportPayload) {
    const projectName =
      this.getString(payload.projectName) ?? 'Imported Project';
    const moduleName = this.getString(payload.moduleName) ?? 'Imported Module';
    const project = await this.ensureProject(projectName);
    const module = await this.ensureModule(
      project.id,
      moduleName,
      this.getString(payload.moduleDescription),
    );
    const testCases = this.getArray(payload.testCases);
    const requirements = this.getArray(payload.requirements);

    let createdTestCases = 0;
    let createdRequirements = 0;

    for (const testCasePayload of testCases) {
      const code = this.getString(testCasePayload.code);
      const title = this.getString(testCasePayload.title);
      if (!code || !title) {
        continue;
      }

      const existing = await this.prisma.test_cases.findUnique({
        where: { code },
        select: { id: true },
      });

      if (!existing) {
        createdTestCases += 1;
      }

      await this.prisma.test_cases.upsert({
        where: { code },
        update: {
          title,
          description: this.getString(testCasePayload.description),
          test_type: this.getString(testCasePayload.testType) ?? 'functional',
          priority: this.getString(testCasePayload.priority) ?? 'medium',
          module_id: module.id,
        },
        create: {
          code,
          title,
          description: this.getString(testCasePayload.description),
          test_type: this.getString(testCasePayload.testType) ?? 'functional',
          priority: this.getString(testCasePayload.priority) ?? 'medium',
          module_id: module.id,
        },
      });
    }

    for (const requirementPayload of requirements) {
      const code = this.getString(requirementPayload.code);
      const title = this.getString(requirementPayload.title);
      if (!code || !title) {
        continue;
      }

      const existing = await this.prisma.requirements.findUnique({
        where: { code },
        select: { id: true },
      });

      if (!existing) {
        createdRequirements += 1;
      }

      const requirement = await this.prisma.requirements.upsert({
        where: { code },
        update: {
          title,
          description: this.getString(requirementPayload.description),
          priority: this.getString(requirementPayload.priority) ?? 'medium',
          project_id: project.id,
          module_id: module.id,
        },
        create: {
          code,
          title,
          description: this.getString(requirementPayload.description),
          priority: this.getString(requirementPayload.priority) ?? 'medium',
          project_id: project.id,
          module_id: module.id,
        },
      });

      const linkedCodes = this.getStringArray(requirementPayload.testCaseCodes);
      for (const linkedCode of linkedCodes) {
        const linkedTestCase = await this.prisma.test_cases.findUnique({
          where: { code: linkedCode },
          select: { id: true },
        });

        if (!linkedTestCase) {
          continue;
        }

        const existingLink = await this.prisma.requirement_test_cases.findFirst(
          {
            where: {
              requirement_id: requirement.id,
              test_case_id: linkedTestCase.id,
            },
            select: { id: true },
          },
        );

        if (!existingLink) {
          await this.prisma.requirement_test_cases.create({
            data: {
              requirement_id: requirement.id,
              test_case_id: linkedTestCase.id,
            },
          });
        }
      }
    }

    return {
      source: 'test-case-repository',
      projectName,
      moduleName,
      createdTestCases,
      createdRequirements,
      importedAt: new Date().toISOString(),
    };
  }

  async importExecutionReport(payload: ImportPayload) {
    const projectName =
      this.getString(payload.projectName) ?? 'Imported Project';
    const project = await this.ensureProject(projectName);
    const runName =
      this.getString(payload.runName) ?? `Imported Run ${Date.now()}`;
    const results = this.getArray(payload.results);

    const testRun = await this.prisma.test_runs.create({
      data: {
        project_id: project.id,
        run_name: runName,
        environment: this.getString(payload.environment) ?? 'staging',
        executed_by: this.getString(payload.executedBy) ?? 'import',
        executed_at: this.getDate(payload.executedAt) ?? new Date(),
      },
    });

    let importedResults = 0;

    for (const resultPayload of results) {
      const testCaseCode = this.getString(resultPayload.testCaseCode);
      if (!testCaseCode) {
        continue;
      }

      const testCase = await this.prisma.test_cases.findUnique({
        where: { code: testCaseCode },
        select: { id: true },
      });

      if (!testCase) {
        continue;
      }

      await this.prisma.test_results.create({
        data: {
          test_run_id: testRun.id,
          test_case_id: testCase.id,
          status: this.getString(resultPayload.status) ?? 'failed',
          execution_time_seconds: this.getNumber(
            resultPayload.executionTimeSeconds,
          ),
          actual_result: this.getString(resultPayload.actualResult),
        },
      });

      importedResults += 1;
    }

    return {
      source: 'execution-report',
      runName,
      importedResults,
      importedAt: new Date().toISOString(),
    };
  }

  async importTestExecution(payload: ImportPayload) {
    const result = await this.importExecutionReport(payload);
    await this.systemService.recordHistory(
      'input',
      `Imported execution report ${result.runName}`,
    );
    return result;
  }

  async importBugTracking(payload: ImportPayload) {
    const projectName =
      this.getString(payload.projectName) ?? 'Imported Project';
    const project = await this.ensureProject(projectName);
    const tracker = this.getString(payload.tracker) ?? 'manual';
    const issues = this.getArray(payload.issues);
    let upsertedIssues = 0;

    for (const issuePayload of issues) {
      const bugCode = this.getString(issuePayload.bugCode);
      const moduleName = this.getString(issuePayload.moduleName);
      const title = this.getString(issuePayload.title);

      if (!bugCode || !moduleName || !title) {
        continue;
      }

      const module = await this.ensureModule(project.id, moduleName);
      const testCaseCode = this.getString(issuePayload.testCaseCode);
      const linkedTestCase = testCaseCode
        ? await this.prisma.test_cases.findUnique({
            where: { code: testCaseCode },
            select: { id: true },
          })
        : null;

      await this.prisma.bugs.upsert({
        where: { bug_code: bugCode },
        update: {
          module_id: module.id,
          test_case_id: linkedTestCase?.id ?? null,
          title,
          description:
            this.getString(issuePayload.description) ??
            `Imported from ${tracker.toUpperCase()} issue tracker`,
          severity: this.getString(issuePayload.severity) ?? 'medium',
          priority: this.getString(issuePayload.priority) ?? 'medium',
          source: this.getString(issuePayload.source) ?? 'testing',
          status: this.getString(issuePayload.status) ?? 'open',
        },
        create: {
          module_id: module.id,
          test_case_id: linkedTestCase?.id ?? null,
          bug_code: bugCode,
          title,
          description:
            this.getString(issuePayload.description) ??
            `Imported from ${tracker.toUpperCase()} issue tracker`,
          severity: this.getString(issuePayload.severity) ?? 'medium',
          priority: this.getString(issuePayload.priority) ?? 'medium',
          source: this.getString(issuePayload.source) ?? 'testing',
          status: this.getString(issuePayload.status) ?? 'open',
        },
      });

      upsertedIssues += 1;
    }

    return {
      source: 'bug-tracking',
      tracker,
      upsertedIssues,
      importedAt: new Date().toISOString(),
    };
  }

  async syncBugData(payload: ImportPayload) {
    const result = await this.importBugTracking(payload);
    await this.systemService.recordHistory(
      'input',
      `Synced ${result.upsertedIssues} bug records from ${result.tracker}`,
    );
    return result;
  }

  async importCodeRepository(payload: ImportPayload) {
    const projectName =
      this.getString(payload.projectName) ?? 'Imported Project';
    const project = await this.ensureProject(projectName);
    const repository = this.getString(payload.repository) ?? 'repository';
    const coverageRows = this.getArray(payload.coverage);
    let importedCoverageRows = 0;

    for (const coveragePayload of coverageRows) {
      const moduleName = this.getString(coveragePayload.moduleName);
      if (!moduleName) {
        continue;
      }

      const module = await this.ensureModule(project.id, moduleName);
      const coveragePercent = this.getNumber(coveragePayload.coveragePercent);

      if (coveragePercent === null) {
        continue;
      }

      await this.prisma.code_coverage.create({
        data: {
          module_id: module.id,
          coverage_percent: coveragePercent,
          report_date: this.getDate(coveragePayload.reportDate) ?? new Date(),
        },
      });

      importedCoverageRows += 1;
    }

    return {
      source: 'code-repository',
      repository,
      importedCoverageRows,
      importedAt: new Date().toISOString(),
    };
  }

  async connectRepo(payload: ImportPayload) {
    const result = await this.importCodeRepository(payload);
    await this.systemService.recordHistory(
      'input',
      `Connected code repository ${result.repository}`,
    );
    return result;
  }

  private async importTestCasesFromRows(
    rows: ImportPayload[],
    meta: {
      projectName?: string;
      moduleName?: string;
    },
  ) {
    const projectName = meta.projectName?.trim() || 'Imported Project';
    const grouped = new Map<
      string,
      {
        moduleName: string;
        moduleDescription?: string;
        testCases: ImportPayload[];
        requirements: Map<string, ImportPayload>;
      }
    >();

    for (const row of rows) {
      const moduleName =
        this.getString(row.moduleName) ??
        meta.moduleName?.trim() ??
        'Imported Module';
      const bucket =
        grouped.get(moduleName) ??
        {
          moduleName,
          moduleDescription: this.getString(row.moduleDescription) ?? undefined,
          testCases: [],
          requirements: new Map<string, ImportPayload>(),
        };

      const testCaseCode = this.getString(row.testCaseCode);
      const testCaseTitle = this.getString(row.testCaseTitle);
      if (testCaseCode && testCaseTitle) {
        bucket.testCases.push({
          code: testCaseCode,
          title: testCaseTitle,
          description: this.getString(row.testCaseDescription),
          testType: this.getString(row.testType) ?? 'functional',
          priority: this.getString(row.testCasePriority) ?? 'medium',
        });
      }

      const requirementCode = this.getString(row.requirementCode);
      const requirementTitle = this.getString(row.requirementTitle);
      if (requirementCode && requirementTitle) {
        const existingRequirement = bucket.requirements.get(requirementCode) ?? {
          code: requirementCode,
          title: requirementTitle,
          description: this.getString(row.requirementDescription),
          priority: this.getString(row.requirementPriority) ?? 'medium',
          testCaseCodes: [],
        };
        const linkedTestCaseCodes = new Set(
          this.getStringArray(existingRequirement.testCaseCodes),
        );
        if (testCaseCode) {
          linkedTestCaseCodes.add(testCaseCode);
        }
        existingRequirement.testCaseCodes = [...linkedTestCaseCodes];
        bucket.requirements.set(requirementCode, existingRequirement);
      }

      grouped.set(moduleName, bucket);
    }

    const imports = [];
    for (const item of grouped.values()) {
      imports.push(
        await this.importTestCaseRepository({
          projectName,
          moduleName: item.moduleName,
          moduleDescription: item.moduleDescription,
          testCases: item.testCases,
          requirements: [...item.requirements.values()],
        }),
      );
    }

    return {
      projectName,
      importedModules: imports.length,
      details: imports,
      expectedHeaders: [
        'moduleName',
        'moduleDescription',
        'testCaseCode',
        'testCaseTitle',
        'testCaseDescription',
        'testType',
        'testCasePriority',
        'requirementCode',
        'requirementTitle',
        'requirementDescription',
        'requirementPriority',
      ],
    };
  }

  private async importExecutionFromRows(
    rows: ImportPayload[],
    meta: {
      projectName?: string;
      runName?: string;
    },
  ) {
    const payload = {
      projectName: meta.projectName?.trim() || 'Imported Project',
      runName: meta.runName?.trim() || `Imported Run ${Date.now()}`,
      environment:
        this.getString(rows[0]?.environment) ?? 'staging',
      executedBy: this.getString(rows[0]?.executedBy) ?? 'csv-import',
      executedAt: this.getString(rows[0]?.executedAt) ?? new Date().toISOString(),
      results: rows.map((row) => ({
        testCaseCode: this.getString(row.testCaseCode),
        status: this.getString(row.status) ?? 'failed',
        executionTimeSeconds: this.getNumber(row.executionTimeSeconds),
        actualResult: this.getString(row.actualResult),
      })),
    };

    return {
      ...(await this.importExecutionReport(payload)),
      expectedHeaders: [
        'testCaseCode',
        'status',
        'executionTimeSeconds',
        'actualResult',
        'environment',
        'executedBy',
        'executedAt',
      ],
    };
  }

  private async importBugTrackingFromRows(
    rows: ImportPayload[],
    meta: {
      projectName?: string;
      tracker?: string;
    },
  ) {
    const payload = {
      projectName: meta.projectName?.trim() || 'Imported Project',
      tracker: meta.tracker?.trim() || 'csv-import',
      issues: rows.map((row) => ({
        bugCode: this.getString(row.bugCode),
        moduleName: this.getString(row.moduleName),
        testCaseCode: this.getString(row.testCaseCode),
        title: this.getString(row.title),
        description: this.getString(row.description),
        severity: this.getString(row.severity),
        priority: this.getString(row.priority),
        source: this.getString(row.source),
        status: this.getString(row.status),
      })),
    };

    return {
      ...(await this.importBugTracking(payload)),
      expectedHeaders: [
        'bugCode',
        'moduleName',
        'testCaseCode',
        'title',
        'description',
        'severity',
        'priority',
        'source',
        'status',
      ],
    };
  }

  private async importCoverageFromRows(
    rows: ImportPayload[],
    meta: {
      projectName?: string;
      repository?: string;
    },
  ) {
    const payload = {
      projectName: meta.projectName?.trim() || 'Imported Project',
      repository: meta.repository?.trim() || 'csv-import',
      coverage: rows.map((row) => ({
        moduleName: this.getString(row.moduleName),
        coveragePercent: this.getNumber(row.coveragePercent),
        reportDate: this.getString(row.reportDate),
      })),
    };

    return {
      ...(await this.importCodeRepository(payload)),
      expectedHeaders: ['moduleName', 'coveragePercent', 'reportDate'],
    };
  }

  private async ensureProject(name: string) {
    const existing = await this.prisma.projects.findFirst({
      where: { name },
      select: { id: true, name: true },
    });

    if (existing) {
      return existing;
    }

    return this.prisma.projects.create({
      data: {
        name,
        description: `Imported project ${name}`,
      },
      select: { id: true, name: true },
    });
  }

  private async ensureModule(
    projectId: number,
    name: string,
    description?: string | null,
  ) {
    const existing = await this.prisma.modules.findFirst({
      where: { project_id: projectId, name },
      select: { id: true, name: true },
    });

    if (existing) {
      return existing;
    }

    return this.prisma.modules.create({
      data: {
        project_id: projectId,
        name,
        description: description ?? `Imported module ${name}`,
      },
      select: { id: true, name: true },
    });
  }

  private getString(value: unknown): string | null {
    return typeof value === 'string' && value.trim() ? value.trim() : null;
  }

  private getNumber(value: unknown): number | null {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
  }

  private getDate(value: unknown): Date | null {
    if (!value) {
      return null;
    }

    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? null : value;
    }

    if (typeof value !== 'string' && typeof value !== 'number') {
      return null;
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private getArray(value: unknown): ImportPayload[] {
    return Array.isArray(value)
      ? value.filter(
          (item): item is ImportPayload => !!item && typeof item === 'object',
        )
      : [];
  }

  private getStringArray(value: unknown): string[] {
    return Array.isArray(value)
      ? value
          .map((item) => this.getString(item))
          .filter((item): item is string => Boolean(item))
      : [];
  }

  private parseCsv(content: string): ImportPayload[] {
    const lines = content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length < 2) {
      return [];
    }

    const headers = this.parseCsvLine(lines[0]);
    return lines.slice(1).map((line) => {
      const values = this.parseCsvLine(line);
      const row: ImportPayload = {};

      headers.forEach((header, index) => {
        row[header] = values[index] ?? '';
      });

      return row;
    });
  }

  private parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let index = 0; index < line.length; index += 1) {
      const character = line[index];
      const nextCharacter = line[index + 1];

      if (character === '"' && inQuotes && nextCharacter === '"') {
        current += '"';
        index += 1;
        continue;
      }

      if (character === '"') {
        inQuotes = !inQuotes;
        continue;
      }

      if (character === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
        continue;
      }

      current += character;
    }

    result.push(current.trim());
    return result;
  }
}
