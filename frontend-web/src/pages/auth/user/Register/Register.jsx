import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Container,
  Card,
  Title,
  Form,
  InputWrapper,
  Input,
  InputIcon,
  Button,
  ToggleText,
  ToggleLink,
  ErrorMessage,
} from "./style";
import { register as registerApi, confirmOtp as confirmOtpApi } from "../../../../services/authService";
import { useToast } from "../../../../contexts/ToastProvider";
import { User, Mail, Lock, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../contexts/UserContext";

function Register() {
  const [step, setStep] = useState("register"); // "register" | "otp"
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [tempUserId, setTempUserId] = useState(null);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(180);

  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const otpRefs = useRef([]);

  // Countdown OTP
  useEffect(() => {
    if (step !== "otp") return;
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  // Focus ô đầu tiên khi vào step OTP
  useEffect(() => {
    if (step === "otp" && otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, [step]);

  // Gửi thông tin đăng ký (chưa lưu DB, chỉ gửi OTP)
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await registerApi(fullName, email, password, phone);
      setTempUserId(data.tempUserId); // ID tạm để xác thực OTP
      setOtpValues(Array(6).fill(""));
      setTimer(180);
      toast.success(" OTP đã gửi tới email của bạn!");
      setStep("otp");
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Đăng ký thất bại!";
      setError(message);
      toast.error(` ${message}`);
    }
  };

  // Xác nhận OTP -> lưu user vào DB
  const handleConfirmOtp = async (e) => {
    e.preventDefault();
    if (timer <= 0) {
      toast.error("⏰ OTP đã hết hạn! Vui lòng gửi lại OTP.");
      return;
    }
    setError("");
    try {
      const otpString = otpValues.join("");
      const userData = await confirmOtpApi(tempUserId, otpString); // tạo user thật
      login(userData);
      toast.success(" Kích hoạt thành công, bạn đã đăng nhập!");
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "OTP không hợp lệ!";
      setError(message);
      toast.error(` ${message}`);
    }
  };

  // Nhập OTP từng ô
  const handleOtpChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    const newOtp = [...otpValues];
    newOtp[idx] = val.slice(-1);
    setOtpValues(newOtp);
    if (val && idx < 5) otpRefs.current[idx + 1].focus();
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otpValues];
      newOtp[idx] = "";
      setOtpValues(newOtp);
      if (idx > 0) otpRefs.current[idx - 1].focus();
    }
  };

  // Gửi lại OTP
  const resendOtp = async () => {
    setError("");
    try {
      const data = await registerApi(fullName, email, password, phone);
      setTempUserId(data.tempUserId);
      setOtpValues(Array(6).fill(""));
      setTimer(180);
      toast.success(" OTP mới đã gửi tới email!");
      if (otpRefs.current[0]) otpRefs.current[0].focus();
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Không thể gửi lại OTP!";
      setError(message);
      toast.error(` ${message}`);
    }
  };

  const formatTimer = () => {
    const m = Math.floor(timer / 60).toString().padStart(2, "0");
    const s = (timer % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <Container>
      <Card>
        {step === "register" && (
          <>
            <Title>Đăng ký</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleRegister}>
              <InputWrapper>
                <InputIcon>
                  <User size={18} />
                </InputIcon>
                <Input
                  type="text"
                  placeholder="Họ và tên"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </InputWrapper>
              <InputWrapper>
                <InputIcon>
                  <Mail size={18} />
                </InputIcon>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputWrapper>
              <InputWrapper>
                <InputIcon>
                  <Lock size={18} />
                </InputIcon>
                <Input
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputWrapper>
              <InputWrapper>
                <InputIcon>
                  <Phone size={18} />
                </InputIcon>
                <Input
                  type="text"
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputWrapper>
              <Button type="submit">Đăng ký</Button>
            </Form>
          </>
        )}

        {step === "otp" && (
          <>
            <Title>Xác nhận OTP</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div style={{ marginBottom: "10px" }}>
              Thời gian còn lại: {formatTimer()}
            </div>
            <Form
              onSubmit={handleConfirmOtp}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "8px",
                }}
              >
                {otpValues.map((value, idx) => (
                  <Input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={value}
                    $otp // transient prop (để styled-components không gửi vào DOM)
                    ref={(el) => (otpRefs.current[idx] = el)}
                    onChange={(e) => handleOtpChange(e, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    style={{
                      width: "45px",
                      height: "55px",
                      fontSize: "20px",
                      textAlign: "center",
                    }}
                    disabled={timer <= 0}
                    required
                  />
                ))}
              </div>
              <Button type="submit" disabled={timer <= 0}>
                Xác nhận OTP
              </Button>
            </Form>
            <Button
              type="button"
              style={{ marginTop: "10px" }}
              onClick={resendOtp}
            >
              Gửi lại OTP
            </Button>
          </>
        )}

        <ToggleText>
          Đã có tài khoản?{" "}
          <ToggleLink href="/auth/login">Đăng nhập</ToggleLink>
        </ToggleText>
      </Card>
    </Container>
  );
}

export default Register;
