package com.example.shopdb.service;

import com.example.shopdb.dto.request.OrderRequest;
import com.example.shopdb.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {
    List<OrderResponse> getAll();
    OrderResponse getById(Long id);
    OrderResponse create(OrderRequest request);
    OrderResponse update(Long id, OrderRequest request);
    void delete(Long id);

    // search nâng cao
    List<OrderResponse> search(String status, String paymentMethod, Long userId, String address);
}
