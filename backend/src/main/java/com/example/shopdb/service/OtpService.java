package com.example.shopdb.service;

public interface OtpService {
    void sendOtp(String email); // Gửi OTP
    boolean verifyOtp(String email, String otp); // Xác thực OTP
}
