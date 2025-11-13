package com.example.shopdb.controller;

import com.example.shopdb.service.impl.VNPayServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/vnpay")
@RequiredArgsConstructor
public class VNPayController {

    private final VNPayServiceImpl vnPayService;

    /**
     * ✅ B1: Tạo URL thanh toán VNPay
     * request body ví dụ:
     * {
     *   "orderId": 123,
     *   "amount": 150000,
     *   "bankCode": "NCB",
     *   "locale": "vn",
     *   "returnUrl": "http://localhost:3000/payment-success"
     * }
     */
    @PostMapping("/create-payment")
    public Map<String, Object> createPayment(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        try {
            // Lấy dữ liệu từ request
            Long orderId = Long.valueOf(request.get("orderId").toString());
            Double amount = Double.valueOf(request.get("amount").toString());
            String bankCode = (String) request.getOrDefault("bankCode", null);
            String locale = (String) request.getOrDefault("locale", "vn");
            String returnUrl = (String) request.getOrDefault("returnUrl", null);

            // Gọi service (đúng 5 tham số)
            String paymentUrl = vnPayService.createPaymentUrl(orderId, amount, bankCode, locale, returnUrl);

            response.put("code", "00");
            response.put("message", "success");
            response.put("paymentUrl", paymentUrl);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("code", "99");
            response.put("message", "failed: " + e.getMessage());
        }
        return response;
    }

    /**
     * ✅ B2: VNPay redirect về sau thanh toán
     * Ví dụ: /api/vnpay/vnpay-return?vnp_ResponseCode=00&vnp_Amount=15000000...
     */
    @GetMapping("/vnpay-return")
    public Map<String, Object> vnpayReturn(@RequestParam Map<String, String> params) {
        Map<String, Object> result = new HashMap<>();
        try {
            boolean verified = vnPayService.verifyPayment(params);

            if (verified && "00".equals(params.get("vnp_ResponseCode"))) {
                result.put("success", true);
                result.put("message", "Thanh toán thành công");
            } else {
                result.put("success", false);
                result.put("message", "Thanh toán thất bại hoặc bị hủy");
            }
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "Lỗi xác nhận: " + e.getMessage());
        }
        return result;
    }
}
