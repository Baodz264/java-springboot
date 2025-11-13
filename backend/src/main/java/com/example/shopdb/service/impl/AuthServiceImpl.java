package com.example.shopdb.service.impl;

import com.example.shopdb.config.JwtService;
import com.example.shopdb.dto.request.LoginRequest;
import com.example.shopdb.dto.request.RegisterRequest;
import com.example.shopdb.dto.response.LoginResponse;
import com.example.shopdb.entity.Role;
import com.example.shopdb.entity.User;
import com.example.shopdb.repository.UserRepository;
import com.example.shopdb.service.AuthService;
import com.example.shopdb.service.OtpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final OtpService otpService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public LoginResponse register(RegisterRequest request) {
        Optional<User> existing = userRepository.findByEmail(request.getEmail());
        if (existing.isPresent()) throw new RuntimeException("Email đã tồn tại!");

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(Role.USER)
                .status(false) // chưa active
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        // gửi OTP
        otpService.sendOtp(user.getEmail());

        return LoginResponse.builder()
                .tempUserId(user.getId())
                .message("OTP đã gửi tới email")
                .build();
    }

    @Override
    public LoginResponse confirmOtp(Long userId, String otp) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));

        boolean valid = otpService.verifyOtp(user.getEmail(), otp);
        if (!valid) throw new RuntimeException("OTP không hợp lệ hoặc đã hết hạn!");

        user.setStatus(true);
        userRepository.save(user);

        String token = jwtService.generateToken(user.getId(), user.getEmail(), user.getRole().name());

        return LoginResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .token(token)
                .role(user.getRole().name())
                .avatarUrl(user.getAvatarUrl())
                .build();
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email không tồn tại"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
            throw new RuntimeException("Mật khẩu sai");

        if (!user.getStatus())
            throw new RuntimeException("Tài khoản chưa kích hoạt. Vui lòng xác nhận OTP!");

        String token = jwtService.generateToken(user.getId(), user.getEmail(), user.getRole().name());

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        return LoginResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .token(token)
                .role(user.getRole().name())
                .avatarUrl(user.getAvatarUrl())
                .build();
    }

    @Override
    public LoginResponse loginAdmin(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email không tồn tại"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
            throw new RuntimeException("Mật khẩu sai");

        if (user.getRole() != Role.ADMIN)
            throw new RuntimeException("Bạn không có quyền truy cập trang quản trị!");

        String token = jwtService.generateToken(user.getId(), user.getEmail(), user.getRole().name());

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        return LoginResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .token(token)
                .role(user.getRole().name())
                .avatarUrl(user.getAvatarUrl())
                .build();
    }

    @Override
    public void sendOtp(String email) {
        otpService.sendOtp(email);
    }
}
