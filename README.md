# 🌟 Ứng Dụng Fullstack Spring Boot & React

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen.svg?logo=spring)
![React](https://img.shields.io/badge/React-19.1.1-blue.svg?logo=react)
![Java](https://img.shields.io/badge/Java-17-orange.svg?logo=java)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue.svg?logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Security-black.svg?logo=json-web-tokens)
![WebSocket](https://img.shields.io/badge/WebSocket-Realtime-yellow.svg)

> Một ứng dụng toàn diện, hiện đại và dễ mở rộng kết hợp sức mạnh của Java Spring Boot (Backend) và React (Frontend).

---

## ✨ Tính Năng Nổi Bật

- **🔐 Xác Thực & Phân Quyền:** Hệ thống bảo mật đăng nhập/đăng ký sử dụng JWT (JSON Web Tokens) kết hợp với Spring Security.
- **💬 Nhắn Tin Theo Thời Gian Thực (Real-Time):** Tích hợp WebSockets (`STOMP` & `SockJS`) giúp trò chuyện mượt mà, không độ trễ.
- **📧 Dịch Vụ Email:** Tự động gửi email thông báo thông qua Spring Boot Mail.
- **☁️ Lưu Trữ Đám Mây:** Quản lý và tải lên hình ảnh/media nhanh chóng nhờ tích hợp Cloudinary.
- **📊 Trực Quan Hóa Dữ Liệu:** Cung cấp biểu đồ tương tác đẹp mắt với Recharts.
- **📄 Xử Lý File Excel:** Hỗ trợ tính năng Nhập (Import) và Xuất (Export) dữ liệu ra file Excel bằng Apache POI.
- **🔥 Tích Hợp Firebase:** Hỗ trợ tính năng thông báo đẩy (Push Notifications) và các dịch vụ đám mây khác bằng Firebase Admin.
- **🎨 Giao Diện Hiện Đại (UI/UX):** Thiết kế thân thiện, tương thích nhiều thiết bị nhờ `styled-components`, thư viện hoạt ảnh `framer-motion` và bộ icon `lucide-react`.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

### ⚙️ Backend (Máy Chủ)
- **Cốt lõi (Core):** Java 17, Spring Boot 3.3.4
- **Cơ Sở Dữ Liệu & ORM:** MySQL, Spring Data JPA
- **Bảo Mật (Security):** Spring Security, JWT (JSON Web Tokens)
- **Thời Gian Thực (Real-Time):** Spring WebSocket
- **APIs:** RESTful API chuẩn REST, HATEOAS, API Document với Swagger (OpenAPI 3)
- **Tích Hợp Khác:** Cloudinary (Lưu ảnh), Firebase Admin, Apache POI (Excel)

### 💻 Frontend (Giao Diện Web)
- **Cốt lõi (Core):** React 19.1, React Router DOM v7
- **Quản lý & Gọi API:** Axios
- **Thời Gian Thực (Real-Time):** `@stomp/stompjs`, `sockjs-client`
- **Giao Diện & Hoạt Ảnh:** Styled-components, Framer Motion
- **Biểu đồ & Icon:** Lucide React, React Icons, Recharts
- **Thông báo UI (Toasts):** React Toastify

---

## 🚀 Hướng Dẫn Cài Đặt

Thực hiện các bước sau để thiết lập dự án chạy trên máy tính (Local) của bạn.

### 📋 Yêu Cầu Hệ Thống (Prerequisites)
- **Java 17** trở lên
- **Node.js** (Khuyến nghị phiên bản 18+), npm hoặc yarn
- **MySQL** (Đã cài đặt và đang chạy)
- **Maven** (không bắt buộc vì đã có sẵn Maven wrapper trong dự án)

### 1️⃣ Thiết Lập Backend (Spring Boot)

1. Di chuyển vào thư mục backend:
   ```bash
   cd backend
   ```
2. Mở file cấu hình `src/main/resources/application.properties` (hoặc `application.yml`) và điền các thông tin:
   - Thông tin kết nối cơ sở dữ liệu MySQL (username, password).
   - Secret key của JWT.
   - Các API key của Cloudinary, Firebase và cấu hình Mail.
3. Build và chạy server backend:
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```
   *Máy chủ backend sẽ chạy tại: `http://localhost:8080`.*
   *Tài liệu API Swagger có thể xem tại: `http://localhost:8080/swagger-ui.html`.*

### 2️⃣ Thiết Lập Frontend (React)

1. Mở một terminal mới và di chuyển vào thư mục frontend:
   ```bash
   cd frontend-web
   ```
2. Cài đặt các gói thư viện:
   ```bash
   npm install
   ```
3. Khởi động ứng dụng React:
   ```bash
   npm start
   ```
   *Trang web sẽ tự động mở trong trình duyệt tại: `http://localhost:3000`.*

---

## 📂 Cấu Trúc Dự Án

```text
java-springboot-main/
│
├── backend/               # Ứng dụng Backend Spring Boot
│   ├── src/main/java/     # Mã nguồn Java
│   ├── src/main/resources/# File cấu hình (application.properties, mẫu email...)
│   └── pom.xml            # Quản lý thư viện Maven
│
└── frontend-web/          # Ứng dụng Web React
    ├── public/            # Chứa ảnh, favicon, file tĩnh
    ├── src/               # Mã nguồn React (Components, Pages, Services, ...)
    └── package.json       # Quản lý thư viện Node (npm)
```

---

## 📸 Hình Ảnh Thực Tế (Screenshots)
*(Chèn hình ảnh hoặc GIF về giao diện phần mềm của bạn vào đây)*

<div align="center">
  <img src="https://via.placeholder.com/800x400.png?text=Dashboard+Preview" alt="Dashboard Preview" width="80%">
</div>

---

## 👤 Tác Giả

Dự án này được phát triển như một sản phẩm cá nhân, thể hiện khả năng xây dựng ứng dụng toàn diện (Fullstack) từ Backend đến Frontend.

---

## 📝 Giấy Phép (License)

Dự án này thuộc sở hữu cá nhân. Vui lòng liên hệ với tác giả để biết thêm về quyền sử dụng mã nguồn.

---
*Phát triển với ❤️.*
