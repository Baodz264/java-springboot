import React, { useState, useContext } from "react";
import {
  Container, Card, Title, Form, InputWrapper, Input,
  InputIcon, Button, ToggleText, ToggleLink, ErrorMessage
} from "./style";
import { login as loginApi } from "../../../../services/authService";
import { useToast } from "../../../../contexts/ToastProvider";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../contexts/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // dùng context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userData = await loginApi(email, password);
      login(userData); // cập nhật context + lưu localStorage
      toast.success("🎉 Đăng nhập thành công!");
      navigate("/"); // chuyển về Home
    } catch (err) {
      const message = err.message || "Đăng nhập thất bại!";
      setError(message);
      toast.error(`❌ ${message}`);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Chào mừng trở lại!</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <InputIcon><Mail size={18} /></InputIcon>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputWrapper>

          <InputWrapper>
            <InputIcon><Lock size={18} /></InputIcon>
            <Input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputWrapper>

          <Button type="submit">Đăng nhập</Button>
        </Form>

        <ToggleText>
          Chưa có tài khoản? <ToggleLink href="/auth/register">Đăng ký</ToggleLink>
        </ToggleText>
      </Card>
    </Container>
  );
}

export default Login;
