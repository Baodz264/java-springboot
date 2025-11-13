package com.example.shopdb.service;

import com.example.shopdb.dto.request.CartRequest;
import com.example.shopdb.dto.response.CartResponse;

import java.util.List;

public interface CartService {
    List<CartResponse> getAll();
    CartResponse getById(Long id);
    CartResponse create(CartRequest request);
    CartResponse update(Long id, CartRequest request);
    void delete(Long id);

    // ✅ Search
    List<CartResponse> searchByUserId(Long userId);
}
