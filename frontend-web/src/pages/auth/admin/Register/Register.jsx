import React, { useState } from "react";
import { register } from "../../../../services/authService";
import {
  Container,
  FormBox,
  Title,
  Input,
  Button,
  LinkText,
  Message,
} from "./style";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // 🔹 State form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // 🔹 Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await register(fullName, email, password, phone); // gọi API register
      setMessage("✅ Đăng ký thành công!");
      setTimeout(() => navigate("/auth/admin/login"), 1000); // navigate frontend login page
    } catch (err) {
      console.error("❌ Lỗi đăng ký:", err);
      // Nếu backend trả lỗi chi tiết, show message đó
      const errorMsg =
        err?.message || err?.error || "Đăng ký thất bại. Vui lòng thử lại!";
      setMessage(`❌ ${errorMsg}`);
    }
  };

  return (
    <Container>
      <FormBox>
        <Title>Tạo tài khoản</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Button type="submit">Đăng ký</Button>
        </form>

        {message && <Message>{message}</Message>}

        <LinkText onClick={() => navigate("/auth/admin/login")}>
          Đã có tài khoản? Đăng nhập
        </LinkText>
      </FormBox>
    </Container>
  );
}
