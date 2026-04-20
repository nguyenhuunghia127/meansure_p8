# 🤖 P8. AI-Driven Test Analytics Dashboard

Bảng điều khiển số liệu kiểm thử tích hợp Trí tuệ Nhân tạo (AI), hỗ trợ quản lý, phân tích chuyên sâu hiệu quả kiểm thử phần mềm (QA/QC). Dự án được thiết kế theo tiêu chuẩn phần mềm SaaS B2B, tách biệt hoàn toàn giữa Frontend, Backend Node.js và một Microservice bằng Python đảm nhận xử lý Machine Learning.

---

## 🎯 **Tính năng chính (Features)**

Tham chiếu trực tiếp từ file yêu cầu gốc, hệ thống đã hoàn thiện 100% các tính năng:
- **📊 Chỉ số hiệu quả kiểm thử (Test Effectiveness):** Tự động tính toán Tỷ lệ thực thi (Execution Rate), Tỷ lệ Pass/Fail, DDP (Defect Detection Percentage), và Tỷ lệ lọt lỗi (Leakage Rate).
- **🛡️ Đo lường độ bao phủ (Test Coverage):** Phân tích tương quan giữa Requirement Coverage, Code Coverage và Test Case Coverage.
- **📈 Phân tích Xu hướng lỗi (Defect Trend):** Bản đồ nhiệt (Timeline) theo dõi và trích xuất lỗi từ nhiều nguồn dữ liệu.
- **🧠 Ứng dụng AI Machine Learning:**
  - Phát hiện các Module tiềm ẩn rủi ro hoặc thiếu kịch bản kiểm thử.
  - Dự đoán "xác suất lỗi" của từng module dựa trên thuật toán **RandomForestClassifier** của Scikit-learn.
  - Tự động sinh/đề xuất kịch bản kiểm thử (Test Cases Recommendations) để trám lấp lỗ hổng ứng dụng.

---

## 🛠 **Kiến trúc Công nghệ (Stack)**

Dự án được xây dựng với cấu trúc Microservice nhẹ:

1. **Frontend (Bảng điều khiển):** `HTML5`, `Vanilla JS`, `CSS3` (Thiết kế phẳng Flat Design, B2B Standard). Giao tiếp với backend qua RESTful API, hoàn toàn mượt mà không cần re-render nặng nề.
2. **Backend (Điều phối & API):** `NestJS (Node.js)`, `TypeScript`. Tiếp nhận dữ liệu, tính toán các công thức QA cơ bản và đóng vai trò Cổng giao tiếp ngoại vi (API Gateway).
3. **Database & ORM:** `PostgreSQL` & `Prisma ORM` (Lưu lịch sử chạy test, kết quả và dự đoán AI).
4. **AI Microservice:** `Python`, `FastAPI`, `Scikit-learn`. Server chạy độc lập xử lý mô hình học máy và phán đoán rủi ro phân phối (chạy ở cổng 5000).

---

## 🚀 **Hướng dẫn Cài đặt & Chạy Dự Án**

### Yêu cầu môi trường cơ bản (Prerequisites)
- [Node.js](https://nodejs.org/en/) (v18+)
- [Python](https://www.python.org/downloads/) (v3.10+)
- PostgreSQL (Có thể dùng PgAdmin hoặc Supabase).

### ⚙️ Bước 1: Khởi động Backend (NestJS & Database)
Mở Terminal ở thư mục gốc của dự án, chạy lần lượt các lệnh:

```bash
# 1. Đi vào thư mục backend
cd backend

# 2. Cài đặt các thư viện cần thiết
npm install

# 3. Tạo file thiết lập Môi trường
# Bắt buộc: Bạn phải tạo file ./backend/.env và đặt biến `DATABASE_URL` tới DB PostgreSQL của bạn.
# VD: DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# 4. Áp dụng bảng Database từ Prisma lên PostgreSQL
npx prisma db push

# 5. Phóng dữ liệu mẫu có sẵn để Test và Demo biểu đồ (Cực kỳ quan trọng)
npx prisma db seed

# 6. Khởi chạy máy chủ Backend (Port 3000 mặc định cũng là trang giao diện Web)
npm run start:dev
```

### 🧠 Bước 2: Khởi động AI Python Server (Machine Learning)
Mở một Terminal thứ 2 (giữ nguyên Terminal 1 đang chạy):

```bash
# 1. Quay lại thư mục gốc và vào thư mục AI
cd ai

# 2. Cài đặt các thư viện Machine learning bằng PIP
pip install -r requirements.txt

# 3. Chạy Server Python AI (Port 5000)
python app.py
```
*(Ngay khi chạy, Python sẽ báo `✅ AI Model successfully trained` cho biết model đã học dữ liệu thành công).*

### 🎉 Bước 3: Trải nghiệm Hệ thống
Sau khi chạy thành công 2 cổng trên, bạn hãy mở trình duyệt và truy cập: 
👉 **[http://localhost:3000](http://localhost:3000)**

Hệ thống giao diện sẽ tự động tải lên danh sách dữ liệu. Bạn có thể thay đổi bộ lọc, ấn nút nhận dạng rủi ro AI để hệ thống phân giải theo thời gian thực (Real-time Prediction).

---

## 📁 **Cấu trúc Thư mục Chính**
```text
.
├── backend/          # Chứa ứng dụng NestJS (API & Database Prisma)
│   ├── prisma/       # Chứa Schema DB và file đổ dữ liệu hạt giống (seed.ts)
│   └── src/          # Source code logic & Metrics Engine
├── frontend/         # Chứa bản Web giao diện (.html, .css, .js) - Được NestJS Serve tĩnh
├── ai/               # Chứa Python FastAPI và AI Model training
│   ├── app.py        # Mã nguồn máy học Scikit Server
│   └── requirements.txt
└── .req              # Tài liệu tham chiếu tính năng hệ thống gốc
```
---
Dự án được xây dựng như một thực thể hoàn chỉnh, sẵn sàng đem ra triển khai thực tế trên môi trường Docker/CI-CD hoặc Demo đồ án! ✨
