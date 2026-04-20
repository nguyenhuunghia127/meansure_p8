import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres.dtdkdwqzqvkvpuedllwd:nghia12723%40@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';
const prisma = new PrismaClient({
  adapter: new PrismaPg(connectionString) as any
});

async function main() {
  console.log('🌱 Bắt đầu bơm Dữ liệu Thực tế (Production Enterprise Dataset)...');

  // Xóa trắng toàn bộ dữ liệu cũ để tránh rác trùng lặp
  await prisma.bugs.deleteMany();
  await prisma.test_results.deleteMany();
  await prisma.test_runs.deleteMany();
  await prisma.test_cases.deleteMany();
  await prisma.requirements.deleteMany();
  await prisma.ai_analysis.deleteMany();
  await prisma.code_coverage.deleteMany();
  await prisma.modules.deleteMany();
  await prisma.projects.deleteMany();

  console.log('✅ Đã dọn sạch Database cũ.');

  // 1. Tạo Dự án Siêu Lớn
  const project = await prisma.projects.create({
    data: {
      name: 'P8 Enterprise E-Commerce SaaS (NextGen)',
      description: 'Hệ thống nền tảng lõi phục vụ hàng triệu giao dịch mỗi ngày. Bao gồm thanh toán, xác thực và vận đơn.',
    },
  });

  // 2. Tạo 3 Modules cốt lõi với tính thực dụng cao
  const modules = await Promise.all([
    prisma.modules.create({ data: { name: 'OAuth2.0 / SSO Auth Gateway', project_id: project.id } }),
    prisma.modules.create({ data: { name: 'Stripe Payment Processing', project_id: project.id } }),
    prisma.modules.create({ data: { name: 'Kafka Inventory Sync', project_id: project.id } }),
  ]);

  const [authModule, paymentModule, inventoryModule] = modules;

  // 3. CODE COVERAGE THỰC TẾ
  // Auth cov tốt, Payment cov cực thấp (dễ sinh high risk), Inventory trung bình
  await prisma.code_coverage.createMany({
    data: [
      { module_id: authModule.id, coverage_percent: 94.5, report_date: new Date() },
      { module_id: paymentModule.id, coverage_percent: 42.1, report_date: new Date() },
      { module_id: inventoryModule.id, coverage_percent: 78.8, report_date: new Date() }
    ]
  });

  // 4. REQUIREMENTS CHUẨN KỸ THUẬT CỦA CÔNG TY
  const reqAuth = await prisma.requirements.create({
    data: { module_id: authModule.id, project_id: project.id, code: 'R-AUTH', title: 'REQ-AUTH-01: Đăng nhập bằng Google Account', priority: 'high' }
  });
  const reqPay1 = await prisma.requirements.create({
    data: { module_id: paymentModule.id, project_id: project.id, code: 'R-PAY1', title: 'REQ-PAY-01: Tích hợp API Stripe Checkout', priority: 'critical' }
  });
  const reqPay2 = await prisma.requirements.create({
    data: { module_id: paymentModule.id, project_id: project.id, code: 'R-PAY2', title: 'REQ-PAY-02: Hoàn tiền chậm (Async Refund)', priority: 'medium' }
  });
  const reqInv = await prisma.requirements.create({
    data: { module_id: inventoryModule.id, project_id: project.id, code: 'R-INV', title: 'REQ-INV-01: Khóa hàng tồn kho tránh Race Condition', priority: 'high' }
  });

  // 5. TEST CASES
  const tcs = await Promise.all([
    prisma.test_cases.create({ data: { module_id: authModule.id, code: 'TC-AUTH-01', title: 'Login Google Auth hợp lệ', priority: 'high' } }),
    prisma.test_cases.create({ data: { module_id: authModule.id, code: 'TC-AUTH-02', title: 'Mất kết nối mạng lúc sinh Token', priority: 'high' } }),
    
    prisma.test_cases.create({ data: { module_id: paymentModule.id, code: 'TC-PAY-01', title: 'Thanh toán thẻ Visa qua Stripe', priority: 'high' } }),
    prisma.test_cases.create({ data: { module_id: paymentModule.id, code: 'TC-PAY-02', title: 'WebHook Stripe báo thanh toán rớt', priority: 'high' } }),
    // Payment cố tình có rất ít test case so với requirement để tạo High Risk

    prisma.test_cases.create({ data: { module_id: inventoryModule.id, code: 'TC-INV-01', title: '2 users cùng mua 1 món hàng cuối cùng (Race Condition)', priority: 'high' } })
  ]);

  // Nối Requirement <-> Test Case
  await prisma.requirement_test_cases.create({ data: { requirement_id: reqAuth.id, test_case_id: tcs[0].id } });
  await prisma.requirement_test_cases.create({ data: { requirement_id: reqPay1.id, test_case_id: tcs[2].id } });
  await prisma.requirement_test_cases.create({ data: { requirement_id: reqPay2.id, test_case_id: tcs[3].id } });
  await prisma.requirement_test_cases.create({ data: { requirement_id: reqInv.id, test_case_id: tcs[4].id } });

  // 6. TEST RUNS VÀ KẾT QUẢ THỰC TẾ
  const testRun = await prisma.test_runs.create({
    data: { run_name: 'Sprint 24 Nightly Regression', environment: 'staging', project_id: project.id }
  });

  await prisma.test_results.createMany({
    data: [
      { test_case_id: tcs[0].id, test_run_id: testRun.id, status: 'passed', execution_time_seconds: 1.2 },
      { test_case_id: tcs[1].id, test_run_id: testRun.id, status: 'passed', execution_time_seconds: 0.8 },
      { test_case_id: tcs[2].id, test_run_id: testRun.id, status: 'passed', execution_time_seconds: 3.4 }, // Payment happy path pass
      { test_case_id: tcs[3].id, test_run_id: testRun.id, status: 'failed', execution_time_seconds: 8.9 }, // Stripe Webhook rớt
      { test_case_id: tcs[4].id, test_run_id: testRun.id, status: 'failed', execution_time_seconds: 5.1 }, // Lỗi kỹ thuật Race Condition Inv
    ]
  });

  // 7. TẠO BUG THỰC TẾ (Bugs log từ Production và Testing)
  await prisma.bugs.createMany({
    data: [
      { module_id: paymentModule.id, bug_code: 'BUG-001', title: 'Khách hàng charge thẻ 2 lần', source: 'production', severity: 'critical', status: 'open' },
      { module_id: paymentModule.id, bug_code: 'BUG-002', title: 'Giao diện Stripe lố font', source: 'testing', severity: 'high', status: 'open' },
      { module_id: paymentModule.id, bug_code: 'BUG-003', title: 'Lỗi timeout API', source: 'testing', severity: 'high', status: 'resolved' },
      { module_id: inventoryModule.id, bug_code: 'BUG-004', title: 'Race condition', source: 'testing', severity: 'medium', status: 'open' },
      { module_id: authModule.id, bug_code: 'BUG-005', title: 'Mất session cache', source: 'testing', severity: 'low', status: 'resolved' },
    ]
  });

  console.log('✅ Bơm xong dữ liệu Production. Tổng cộng:');
  console.log(`- 1 Dự án Core, ${modules.length} Modules.`);
  console.log(`- ${tcs.length} Test cases, có Pass có Fail.`);
  console.log(`- API Coverage có module rớt đáy 42% (Payment).`);
  console.log(`- Chứa Bug Production ngầm định.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
