import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Header,
  Form,
  FormRow,
  FormLabel,
  FormInput,
  SubmitButton,
  LinkButton,
} from "./style";

// Component OTP
const OTPInput = ({ otp, setOtp, onComplete, duration = 180 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const otpRefs = useRef([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (e, idx) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[idx] = val;
      setOtp(newOtp);

      if (val && idx < otp.length - 1) otpRefs.current[idx + 1].focus();
      if (!val && idx > 0) otpRefs.current[idx - 1].focus();
    }
  };

  useEffect(() => {
    onComplete(otp.every(o => o !== ""));
  }, [otp, onComplete]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "10px" }}>
        {otp.map((val, idx) => (
          <FormInput
            key={idx}
            type="text"
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(e, idx)}
            ref={el => otpRefs.current[idx] = el}
            style={{ width: "40px", textAlign: "center", fontSize: "18px" }}
            disabled={timeLeft <= 0}
          />
        ))}
      </div>
      <div style={{ fontSize: "14px", color: timeLeft <= 0 ? "red" : "#555" }}>
        {timeLeft > 0 ? `Hết hạn sau ${formatTime(timeLeft)}` : "OTP đã hết hạn. Gửi lại."}
      </div>
    </div>
  );
};

const ChangePasswordTab = () => {
  const [step, setStep] = useState("login"); // login | forgotEmail | otp | resetPassword
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    email: "",
    otp: Array(6).fill(""),
  });
  const [otpComplete, setOtpComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === "login") {
      if (form.newPassword !== form.confirmPassword) return alert("Mật khẩu mới và xác nhận không khớp!");
      alert("Đổi mật khẩu thành công!");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "", email: "", otp: Array(6).fill("") });
    }

    if (step === "forgotEmail") {
      if (!form.email) return alert("Nhập email để nhận OTP!");
      alert(`OTP đã gửi đến ${form.email}`);
      setStep("otp");
      setForm(prev => ({ ...prev, otp: Array(6).fill("") }));
    }

    if (step === "otp") {
      if (!otpComplete) return alert("Nhập đầy đủ OTP!");
      alert("OTP hợp lệ! Tiếp tục đổi mật khẩu");
      setStep("resetPassword");
    }

    if (step === "resetPassword") {
      if (form.newPassword !== form.confirmPassword) return alert("Mật khẩu mới và xác nhận không khớp!");
      alert(`Đặt lại mật khẩu thành công cho ${form.email}`);
      setStep("login");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "", email: "", otp: Array(6).fill("") });
      setOtpComplete(false);
    }
  };

  return (
    <Container>
      <Header>
        {step === "login" && "Đổi mật khẩu"}
        {step === "forgotEmail" && "Quên mật khẩu"}
        {step === "otp" && "Nhập OTP"}
        {step === "resetPassword" && "Đặt lại mật khẩu"}
      </Header>

      <Form onSubmit={handleSubmit}>
        {step === "login" && (
          <>
            <FormRow>
              <FormLabel>Mật khẩu cũ</FormLabel>
              <FormInput
                type="password"
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu cũ"
                required
              />
            </FormRow>
            <FormRow>
              <FormLabel>Mật khẩu mới</FormLabel>
              <FormInput
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu mới"
                required
              />
            </FormRow>
            <FormRow>
              <FormLabel>Xác nhận mật khẩu mới</FormLabel>
              <FormInput
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Xác nhận mật khẩu mới"
                required
              />
            </FormRow>
          </>
        )}

        {step === "forgotEmail" && (
          <FormRow>
            <FormLabel>Email</FormLabel>
            <FormInput
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Nhập email"
              required
            />
          </FormRow>
        )}

        {step === "otp" && (
          <FormRow>
            <FormLabel>Nhập OTP (6 số)</FormLabel>
            <OTPInput otp={form.otp} setOtp={(otpArr) => setForm(prev => ({ ...prev, otp: otpArr }))} onComplete={setOtpComplete} duration={180} />
          </FormRow>
        )}

        {step === "resetPassword" && (
          <>
            <FormRow>
              <FormLabel>Mật khẩu mới</FormLabel>
              <FormInput
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu mới"
                required
              />
            </FormRow>
            <FormRow>
              <FormLabel>Xác nhận mật khẩu mới</FormLabel>
              <FormInput
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Xác nhận mật khẩu mới"
                required
              />
            </FormRow>
          </>
        )}

        <SubmitButton type="submit">
          {step === "login" && "Lưu mật khẩu"}
          {step === "forgotEmail" && "Gửi OTP"}
          {step === "otp" && "Xác nhận OTP"}
          {step === "resetPassword" && "Đặt lại mật khẩu"}
        </SubmitButton>

        {step === "login" && (
          <LinkButton type="button" onClick={() => setStep("forgotEmail")}>
            Quên mật khẩu?
          </LinkButton>
        )}
      </Form>
    </Container>
  );
};

export default ChangePasswordTab;
