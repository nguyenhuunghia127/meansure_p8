-- Drop all tables if exists
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS test_results CASCADE;
DROP TABLE IF EXISTS test_runs CASCADE;
DROP TABLE IF EXISTS requirement_test_cases CASCADE;
DROP TABLE IF EXISTS test_cases CASCADE;
DROP TABLE IF EXISTS requirements CASCADE;
DROP TABLE IF EXISTS code_coverage CASCADE;
DROP TABLE IF EXISTS bugs CASCADE;
DROP TABLE IF EXISTS ai_analysis CASCADE;
DROP TABLE IF EXISTS modules CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- CreateTable projects
CREATE TABLE "public"."projects" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable modules
CREATE TABLE "public"."modules" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "project_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "modules_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable requirements
CREATE TABLE "public"."requirements" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "project_id" INTEGER NOT NULL,
    "module_id" INTEGER,
    "code" VARCHAR(50) NOT NULL UNIQUE,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "priority" VARCHAR(20),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "requirements_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "requirements_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."modules" ("id") ON UPDATE NO ACTION
);

-- CreateTable test_cases
CREATE TABLE "public"."test_cases" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "module_id" INTEGER NOT NULL,
    "code" VARCHAR(50) NOT NULL UNIQUE,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "test_type" VARCHAR(50),
    "priority" VARCHAR(20),
    "status" VARCHAR(20) DEFAULT 'active',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "test_cases_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."modules" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable bugs
CREATE TABLE "public"."bugs" (
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
CREATE TABLE "public"."code_coverage" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "module_id" INTEGER NOT NULL,
    "coverage_percent" DECIMAL(5,2) NOT NULL,
    "report_date" DATE NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "code_coverage_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."modules" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable test_runs
CREATE TABLE "public"."test_runs" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "project_id" INTEGER NOT NULL,
    "run_name" VARCHAR(255) NOT NULL,
    "environment" VARCHAR(50),
    "executed_by" VARCHAR(100),
    "executed_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "test_runs_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable test_results
CREATE TABLE "public"."test_results" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "test_run_id" INTEGER NOT NULL,
    "test_case_id" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "execution_time_seconds" INTEGER,
    "actual_result" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "test_results_test_run_id_fkey" FOREIGN KEY ("test_run_id") REFERENCES "public"."test_runs" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "test_results_test_case_id_fkey" FOREIGN KEY ("test_case_id") REFERENCES "public"."test_cases" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable requirement_test_cases
CREATE TABLE "public"."requirement_test_cases" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "requirement_id" INTEGER NOT NULL,
    "test_case_id" INTEGER NOT NULL,
    CONSTRAINT "requirement_test_cases_requirement_id_fkey" FOREIGN KEY ("requirement_id") REFERENCES "public"."requirements" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "requirement_test_cases_test_case_id_fkey" FOREIGN KEY ("test_case_id") REFERENCES "public"."test_cases" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "requirement_test_cases_requirement_id_test_case_id_key" UNIQUE ("requirement_id", "test_case_id")
);

-- CreateTable ai_analysis
CREATE TABLE "public"."ai_analysis" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "module_id" INTEGER NOT NULL,
    "risk_level" VARCHAR(20),
    "risk_score" DECIMAL(5,2),
    "insufficient_testing" BOOLEAN DEFAULT false,
    "suggested_test_cases" TEXT,
    "analysis_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ai_analysis_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."modules" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable users
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "username" VARCHAR(100) NOT NULL UNIQUE,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" VARCHAR(30) DEFAULT 'viewer',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable activity_logs
CREATE TABLE "public"."activity_logs" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "action" VARCHAR(50) NOT NULL,
    "detail" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "modules_project_id_idx" ON "public"."modules"("project_id");
CREATE INDEX "requirements_project_id_idx" ON "public"."requirements"("project_id");
CREATE INDEX "requirements_module_id_idx" ON "public"."requirements"("module_id");
CREATE INDEX "test_cases_module_id_idx" ON "public"."test_cases"("module_id");
CREATE INDEX "bugs_module_id_idx" ON "public"."bugs"("module_id");
CREATE INDEX "bugs_test_case_id_idx" ON "public"."bugs"("test_case_id");
CREATE INDEX "code_coverage_module_id_idx" ON "public"."code_coverage"("module_id");
CREATE INDEX "test_runs_project_id_idx" ON "public"."test_runs"("project_id");
CREATE INDEX "test_results_test_run_id_idx" ON "public"."test_results"("test_run_id");
CREATE INDEX "test_results_test_case_id_idx" ON "public"."test_results"("test_case_id");
CREATE INDEX "requirement_test_cases_requirement_id_idx" ON "public"."requirement_test_cases"("requirement_id");
CREATE INDEX "requirement_test_cases_test_case_id_idx" ON "public"."requirement_test_cases"("test_case_id");
CREATE INDEX "ai_analysis_module_id_idx" ON "public"."ai_analysis"("module_id");
