package com.example.shopdb.service;

import jakarta.servlet.http.HttpServletRequest;

public interface VNPayService {
    String createPaymentUrl(HttpServletRequest request, double amount, String orderId);
    String handleReturn(HttpServletRequest request);
}
