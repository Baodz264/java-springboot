package com.example.shopdb.service.impl;

import com.example.shopdb.entity.OtpToken;
import com.example.shopdb.repository.OtpTokenRepository;
import com.example.shopdb.service.EmailService;
import com.example.shopdb.service.OtpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class OtpServiceImpl implements OtpService {

    private final OtpTokenRepository otpTokenRepository;
    private final EmailService emailService;

    private String generateOtp() {
        int otp = 100000 + new Random().nextInt(900000);
        return String.valueOf(otp);
    }

    @Override
    @Async
    public void sendOtp(String email) {
        try {
            String otp = generateOtp();
            LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(5);

            // Xóa token cũ nếu có
            otpTokenRepository.findByEmail(email).ifPresent(otpTokenRepository::delete);

            // Lưu token mới
            otpTokenRepository.save(OtpToken.builder()
                    .email(email)
                    .otp(otp)
                    .expiresAt(expiresAt)
                    .build());

            // Gửi email
            String subject = "🔐 Mã OTP của bạn";
            String html = "<p>Mã OTP: <b>" + otp + "</b> (hết hạn 5 phút)</p>";
            emailService.sendHtmlEmail(email, subject, html);

            log.info("OTP {} đã gửi tới {}", otp, email);
        } catch (Exception e) {
            log.error("Lỗi gửi OTP tới {}: {}", email, e.getMessage());
        }
    }

    @Override
    public boolean verifyOtp(String email, String otp) {
        Optional<OtpToken> tokenOpt = otpTokenRepository.findByEmail(email);
        if (tokenOpt.isEmpty()) return false;

        OtpToken token = tokenOpt.get();
        if (!token.getOtp().equals(otp)) return false;
        if (token.getExpiresAt().isBefore(LocalDateTime.now())) return false;

        // Xóa token sau khi xác thực thành công
        otpTokenRepository.delete(token);
        return true;
    }
}
