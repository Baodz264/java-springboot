package com.example.shopdb.service;

import com.example.shopdb.dto.request.OrderItemRequest;
import com.example.shopdb.dto.response.OrderItemResponse;

import java.util.List;

public interface OrderItemService {
    List<OrderItemResponse> getAll();
    OrderItemResponse getById(Long id);
    OrderItemResponse create(OrderItemRequest request);
    OrderItemResponse update(Long id, OrderItemRequest request);
    void delete(Long id);

    // ✅ chức năng search
    List<OrderItemResponse> search(Long orderId, Long productVariantId);
}
