package com.example.shopdb.controller;

import com.example.shopdb.dto.request.LoginRequest;
import com.example.shopdb.dto.request.RegisterRequest;
import com.example.shopdb.dto.response.LoginResponse;
import com.example.shopdb.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map; // ⚡ thêm import Map

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public LoginResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/confirm-otp")
    public LoginResponse confirmOtp(@RequestBody Map<String, String> body) {
        Long userId = Long.valueOf(body.get("tempUserId"));
        String otp = body.get("otp");
        return authService.confirmOtp(userId, otp);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/admin/login")
    public LoginResponse adminLogin(@RequestBody LoginRequest request) {
        return authService.loginAdmin(request);
    }
}
