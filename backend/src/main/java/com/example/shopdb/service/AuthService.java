package com.example.shopdb.service;

import com.example.shopdb.dto.request.LoginRequest;
import com.example.shopdb.dto.request.RegisterRequest;
import com.example.shopdb.dto.response.LoginResponse;

public interface AuthService {

    LoginResponse register(RegisterRequest request);

    LoginResponse confirmOtp(Long userId, String otp);

    LoginResponse login(LoginRequest request);

    LoginResponse loginAdmin(LoginRequest request);

    void sendOtp(String email);
}
