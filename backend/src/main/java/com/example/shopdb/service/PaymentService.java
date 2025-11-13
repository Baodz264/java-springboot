package com.example.shopdb.service;

import com.example.shopdb.dto.request.PaymentRequest;
import com.example.shopdb.dto.response.PaymentResponse;

import java.util.List;

public interface PaymentService {
    List<PaymentResponse> getAll();
    PaymentResponse getById(Long id);
    PaymentResponse create(PaymentRequest request);
    PaymentResponse update(Long id, PaymentRequest request);
    void delete(Long id);

    // search
    List<PaymentResponse> search(String keyword, String provider, String status, Double minAmount, Double maxAmount);
}
