package com.example.shopdb.service;

import com.example.shopdb.dto.request.CartItemRequest;
import com.example.shopdb.dto.response.CartItemResponse;

import java.util.List;

public interface CartItemService {
    List<CartItemResponse> getAll();
    CartItemResponse getById(Long id);
    CartItemResponse create(CartItemRequest request);
    CartItemResponse update(Long id, CartItemRequest request);
    void delete(Long id);

    // ✅ Search
    List<CartItemResponse> searchByCartId(Long cartId);
    List<CartItemResponse> searchByVariantId(Long productVariantId);
}
