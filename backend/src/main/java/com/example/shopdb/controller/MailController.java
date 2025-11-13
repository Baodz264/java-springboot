package com.example.shopdb.controller;

import com.example.shopdb.service.AuthService;
import com.example.shopdb.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mail")
@RequiredArgsConstructor
public class MailController {

    private final EmailService emailService;
    private final AuthService authService; // inject interface

    // 1️⃣ Gửi mail text đơn giản
    @GetMapping("/send-text")
    public String sendTextMail(@RequestParam String to) {
        emailService.sendSimpleEmail(to, "Chào bạn!", "Đây là email test từ hệ thống ShopDB 🚀");
        return "Gửi mail văn bản thành công tới " + to;
    }

    // 2️⃣ Gửi mail HTML
    @GetMapping("/send-html")
    public String sendHtmlMail(@RequestParam String to) {
        String html = """
            <div style='font-family: Arial, sans-serif; line-height: 1.6'>
                <h2>Xin chào từ <span style='color:blue'>ShopDB</span>!</h2>
                <p>Bạn đã đăng ký thành công tài khoản của mình 🎉</p>
                <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
            </div>
        """;
        emailService.sendHtmlEmail(to, "ShopDB - Thông báo đăng ký thành công", html);
        return "Gửi mail HTML thành công tới " + to;
    }

    // 3️⃣ Gửi OTP tới email
    @GetMapping("/send-otp")
    public String sendOtp(@RequestParam String to) {
        authService.sendOtp(to); // gọi qua interface
        return "Đã gửi mã OTP 6 số tới " + to;
    }
}
