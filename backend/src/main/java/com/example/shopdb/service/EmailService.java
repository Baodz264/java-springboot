package com.example.shopdb.service;

public interface EmailService {

    // Gửi email text đơn giản
    void sendSimpleEmail(String to, String subject, String text);

    // Gửi email HTML (có định dạng)
    void sendHtmlEmail(String to, String subject, String htmlContent);
}
