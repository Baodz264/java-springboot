import React, { useState } from "react";
import { login } from "../../../../services/authService";
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

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await login(email, password);
      const user = res?.data || res;

      if (user.role === "ADMIN") {
        // ✅ Lưu token & user riêng cho admin
        localStorage.setItem("admin_token", user.token);
        localStorage.setItem("admin_user", JSON.stringify(user));

        setMessage("✅ Đăng nhập thành công!");
        setTimeout(() => navigate("/admin/Dashboard"), 1000);
      } else {
        setMessage("❌ Bạn không có quyền truy cập trang quản trị!");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Đăng nhập thất bại. Kiểm tra lại thông tin!");
    }
  };

  return (
    <Container>
      <FormBox>
        <Title>Đăng nhập Quản trị</Title>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit">Đăng nhập</Button>
        </form>

        {message && <Message>{message}</Message>}

        <LinkText onClick={() => navigate("/auth/admin/register")}>
          Chưa có tài khoản? Đăng ký ngay
        </LinkText>
      </FormBox>
    </Container>
  );
}
