-- CreateTable projects
CREATE TABLE IF NOT EXISTS "public"."projects" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable modules
CREATE TABLE IF NOT EXISTS "public"."modules" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "project_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "modules_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable requirements
CREATE TABLE IF NOT EXISTS "public"."requirements" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "module_id" INTEGER NOT NULL,
    "requirement_id" VARCHAR(50) NOT NULL UNIQUE,
    "description" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "requirements_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."modules" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable test_cases
CREATE TABLE IF NOT EXISTS "public"."test_cases" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "module_id" INTEGER NOT NULL,
    "test_case_id" VARCHAR(50) NOT NULL UNIQUE,
    "test_name" VARCHAR(255),
    "description" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "test_cases_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."modules" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable bugs
CREATE TABLE IF NOT EXISTS "public"."bugs" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "module_id" INTEGER NOT NULL,
    "test_case_id" INTEGER,
    "bug_code" VARCHAR(50) NOT NULL UNIQUE,
    "title" VARCHAR(255),
    "description" TEXT,
    "severity" VARCHAR(20),
    "priority" VARCHAR(20),
    "source" VARCHAR(20),
    "status" VARCHAR(20) DEFAULT 'open',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "bugs_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."modules" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "bugs_test_case_id_fkey" FOREIGN KEY ("test_case_id") REFERENCES "public"."test_cases" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable code_coverage
CREATE TABLE IF NOT EXISTS "public"."code_coverage" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "module_id" INTEGER NOT NULL,
    "coverage_percent" DECIMAL(5,2) NOT NULL,
    "report_date" DATE NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "code_coverage_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."modules" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable test_runs
CREATE TABLE IF NOT EXISTS "public"."test_runs" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "module_id" INTEGER NOT NULL,
    "run_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "total_tests" INTEGER,
    "passed_tests" INTEGER,
    "failed_tests" INTEGER,
    CONSTRAINT "test_runs_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."modules" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable test_results
CREATE TABLE IF NOT EXISTS "public"."test_results" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "test_run_id" INTEGER NOT NULL,
    "test_case_id" INTEGER NOT NULL,
    "result" VARCHAR(20),
    "execution_time" INTEGER,
    "error_message" TEXT,
    CONSTRAINT "test_results_test_run_id_fkey" FOREIGN KEY ("test_run_id") REFERENCES "public"."test_runs" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "test_results_test_case_id_fkey" FOREIGN KEY ("test_case_id") REFERENCES "public"."test_cases" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable requirement_test_cases
CREATE TABLE IF NOT EXISTS "public"."requirement_test_cases" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "requirement_id" INTEGER NOT NULL,
    "test_case_id" INTEGER NOT NULL,
    CONSTRAINT "requirement_test_cases_requirement_id_fkey" FOREIGN KEY ("requirement_id") REFERENCES "public"."requirements" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "requirement_test_cases_test_case_id_fkey" FOREIGN KEY ("test_case_id") REFERENCES "public"."test_cases" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable ai_analysis
CREATE TABLE IF NOT EXISTS "public"."ai_analysis" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "module_id" INTEGER NOT NULL,
    "risk_level" VARCHAR(20),
    "risk_score" DECIMAL(5,2),
    "insufficient_testing" BOOLEAN DEFAULT false,
    "suggested_test_cases" TEXT,
    "analysis_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ai_analysis_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."modules" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "modules_project_id_idx" ON "public"."modules"("project_id");
CREATE INDEX IF NOT EXISTS "requirements_module_id_idx" ON "public"."requirements"("module_id");
CREATE INDEX IF NOT EXISTS "test_cases_module_id_idx" ON "public"."test_cases"("module_id");
CREATE INDEX IF NOT EXISTS "bugs_module_id_idx" ON "public"."bugs"("module_id");
CREATE INDEX IF NOT EXISTS "bugs_test_case_id_idx" ON "public"."bugs"("test_case_id");
CREATE INDEX IF NOT EXISTS "code_coverage_module_id_idx" ON "public"."code_coverage"("module_id");
CREATE INDEX IF NOT EXISTS "test_runs_module_id_idx" ON "public"."test_runs"("module_id");
CREATE INDEX IF NOT EXISTS "test_results_test_run_id_idx" ON "public"."test_results"("test_run_id");
CREATE INDEX IF NOT EXISTS "test_results_test_case_id_idx" ON "public"."test_results"("test_case_id");
CREATE INDEX IF NOT EXISTS "requirement_test_cases_requirement_id_idx" ON "public"."requirement_test_cases"("requirement_id");
CREATE INDEX IF NOT EXISTS "requirement_test_cases_test_case_id_idx" ON "public"."requirement_test_cases"("test_case_id");
CREATE INDEX IF NOT EXISTS "ai_analysis_module_id_idx" ON "public"."ai_analysis"("module_id");
