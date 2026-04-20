import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL missing');
const prisma = new PrismaClient({ adapter: new PrismaPg(connectionString) });

async function main() {
  console.log('Cleaning up old data...');
  await prisma.projects.deleteMany();
  
  console.log('Creating mock Project...');
  const project = await prisma.projects.create({
    data: {
      name: 'P8 Core Architecture',
      description: 'Main project for dashboard reporting',
    }
  });

  const modules = ['Authentication Phase', 'Admin Dashboard Panel', 'Payment Services', 'Data Sync Pipeline'];
  
  for (const modName of modules) {
    const mod = await prisma.modules.create({
      data: {
        project_id: project.id,
        name: modName,
      }
    });

    const req1 = await prisma.requirements.create({
      data: {
        project_id: project.id,
        module_id: mod.id,
        code: `REQ-${mod.id}-001`,
        title: `Core Functionality for ${modName}`,
        priority: 'high'
      }
    });

    const req2 = await prisma.requirements.create({
      data: {
        project_id: project.id,
        module_id: mod.id,
        code: `REQ-${mod.id}-002`,
        title: `Edge Cases and Error Handling for ${modName}`,
        priority: 'medium'
      }
    });

    await prisma.code_coverage.create({
      data: {
        module_id: mod.id,
        coverage_percent: Math.random() * 40 + 50, // 50-90%
        report_date: new Date()
      }
    });

    const tcs = [];
    for (let i=1; i<=12; i++) {
     const tc = await prisma.test_cases.create({
        data: {
          module_id: mod.id,
          code: `TC-${mod.id}-00${i}`,
          title: `Verify ${modName} behavior case ${i}`,
          test_type: 'automated',
          priority: i <= 3 ? 'high' : 'medium',
        }
      });
      tcs.push(tc);

      await prisma.requirement_test_cases.create({
        data: {
          requirement_id: i % 2 === 0 ? req1.id : req2.id,
          test_case_id: tc.id
        }
      });
    }

    const numBugs = Math.floor(Math.random() * 6);
    for (let i=0; i<numBugs; i++) {
        await prisma.bugs.create({
            data: {
                module_id: mod.id,
                test_case_id: tcs[i].id,
                bug_code: `BUG-${mod.id}-${i}`,
                title: `Unexpected behavior in ${modName} sub-flow ${i}`,
                severity: i === 0 ? 'critical' : 'minor',
                source: Math.random() > 0.8 ? 'production' : 'testing',
                status: 'open'
            }
        });
    }
  }

  console.log('Creating Test Runs...');
  for(let r=1; r<=3; r++){
    const run = await prisma.test_runs.create({
      data: {
          project_id: project.id,
          run_name: `Sprint 24 Regression - Run ${r}`,
          environment: r === 3 ? 'production' : 'staging',
          executed_by: 'ci/cd pipeline'
      }
    });

    const allTcs = await prisma.test_cases.findMany();
    for (const tc of allTcs) {
      const passChance = r === 1 ? 0.6 : (r === 2 ? 0.8 : 0.95);
      const passed = Math.random() < passChance;
      await prisma.test_results.create({
          data: {
              test_run_id: run.id,
              test_case_id: tc.id,
              status: passed ? 'passed' : 'failed',
              execution_time_seconds: Math.floor(Math.random() * 15),
              actual_result: passed ? 'Pass' : 'Assertion failed on line 42'
          }
      });
    }
  }

  console.log('Seed completed successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
