<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=250&section=header&text=Fullstack%20Spring%20Boot%20&%20React&fontSize=50&animation=fadeIn&fontAlignY=38&desc=Dự%20án%20cá%20nhân%20tâm%20huyết&descAlignY=51&descAlign=62" alt="Header Banner"/>

  <h1>🚀 Ứng Dụng Đa Nền Tảng (Fullstack)</h1>
  
  <p>
    <b>Kiến trúc mạnh mẽ với Java Spring Boot (Backend) & Giao diện tương tác mượt mà với React (Frontend)</b>
  </p>

  <p>
    <a href="https://spring.io/projects/spring-boot"><img src="https://img.shields.io/badge/Spring_Boot-3.3.4-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot"/></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/></a>
    <a href="https://www.java.com/"><img src="https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java 17"/></a>
    <br>
    <a href="https://www.mysql.com/"><img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/></a>
    <a href="https://jwt.io/"><img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT"/></a>
    <a href="#"><img src="https://img.shields.io/badge/WebSocket-FF5E00?style=for-the-badge&logo=socket.io&logoColor=white" alt="WebSocket"/></a>
  </p>
</div>

---

## 🔥 Điểm Nhấn Dự Án (Highlights)

Dự án này là một hệ thống web hiện đại, được xây dựng với các tiêu chuẩn tốt nhất trong ngành:

- 🛡️ **Bảo Mật Tối Đa:** Hệ thống đăng nhập/phân quyền an toàn tuyệt đối với **JWT** & **Spring Security**.
- ⚡ **Real-time Engine:** Tích hợp **WebSockets (STOMP/SockJS)** mang lại trải nghiệm chat và cập nhật dữ liệu ngay lập tức, không độ trễ.
- ☁️ **Lưu Trữ Đám Mây:** Quản lý hàng ngàn file media tốc độ cao với **Cloudinary**.
- 📊 **Thống Kê Trực Quan:** Biến dữ liệu khô khan thành biểu đồ sống động với **Recharts**.
- 📑 **Tiện Ích Văn Phòng:** Tính năng Import/Export dữ liệu hàng loạt từ file **Excel** bằng Apache POI.
- 🔔 **Thông Báo Chủ Động:** Tích hợp **Firebase Admin** để gửi Push Notification và **Spring Mail** cho các dịch vụ gửi email tự động.
- 🎨 **Trải Nghiệm UI/UX Đỉnh Cao:** Giao diện Responsive 100%, hiệu ứng mượt mà nhờ **framer-motion** & **styled-components**.

---

## 💻 Công Nghệ Cốt Lõi (Tech Stack)

### 🧱 Kiến Trúc Backend (Máy Chủ)
- **Framework:** `Java 17` & `Spring Boot 3.3.4` (Core, Web, Data JPA, Security, Mail, WebSocket)
- **Database:** `MySQL` (Quản trị dữ liệu)
- **Bảo mật:** `JSON Web Tokens (JWT)`
- **Tài liệu API:** `Swagger (OpenAPI 3)`
- **Cloud & Third-party:** `Cloudinary` (Images), `Firebase Admin`, `Apache POI` (Excel)

### 🎨 Kiến Trúc Frontend (Giao Diện)
- **Framework:** `React 19.1` & `React Router DOM v7`
- **Tương tác API:** `Axios`
- **Real-Time:** `@stomp/stompjs`, `sockjs-client`
- **UI/UX & Styling:** `Styled-components`, `Framer Motion` (Hoạt ảnh), `Lucide React` & `React Icons`
- **Tiện ích:** `Recharts` (Biểu đồ), `React Toastify` (Thông báo đẹp)

---

## 🚀 Hướng Dẫn Cài Đặt (Getting Started)

Chỉ mất vài phút để đưa dự án này chạy thử trên máy của bạn.

### 📋 Yêu cầu môi trường
- **Java 17+** | **Node.js 18+** | **MySQL Server**

### 1️⃣ Khởi động Backend (Spring Boot)
1. Truy cập thư mục backend: `cd backend`
2. Mở file `src/main/resources/application.properties` để cấu hình thông tin MySQL, Cloudinary, Firebase và JWT Secret.
3. Build và chạy máy chủ:
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```
   > 🔗 Backend sẽ chạy tại: `http://localhost:8080` <br>
   > 📖 Khám phá API Document tại: `http://localhost:8080/swagger-ui.html`

### 2️⃣ Khởi động Frontend (React)
1. Mở terminal mới, truy cập thư mục frontend: `cd frontend-web`
2. Cài đặt các thư viện cần thiết:
   ```bash
   npm install
   ```
3. Chạy ứng dụng web:
   ```bash
   npm start
   ```
   > 🌐 Trang web sẽ sẵn sàng tại: `http://localhost:3000`

---

## 📂 Tổ Chức Mã Nguồn (Architecture)

```text
java-springboot-main/
│
├── backend/               # ⚙️ Toàn bộ logic máy chủ, API, bảo mật và kết nối DB
│   ├── src/main/java/     # Mã nguồn Java (Controllers, Services, Repositories...)
│   ├── src/main/resources/# Cấu hình (application.properties, email templates...)
│   └── pom.xml            # Quản lý thư viện Java
│
└── frontend-web/          # 🎨 Giao diện người dùng
    ├── public/            # File tĩnh, tài nguyên gốc
    ├── src/               # Mã nguồn React (Components, Pages, Context, Hooks...)
    └── package.json       # Quản lý thư viện Javascript
```

---

## 📸 Hình Ảnh Thực Tế (Screenshots)

<div align="center">
  <img src="https://via.placeholder.com/1000x500.png?text=Dashboard+Preview" alt="Dashboard Preview" width="100%" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
  <br>
  <i>(Giao diện tổng quan của dự án)</i>
</div>
