package com.example.shopdb.service;

import com.example.shopdb.dto.request.ShippingRequest;
import com.example.shopdb.dto.response.ShippingResponse;

import java.util.List;

public interface ShippingService {
    List<ShippingResponse> getAll();
    ShippingResponse getById(Long id);
    ShippingResponse create(ShippingRequest request);
    ShippingResponse update(Long id, ShippingRequest request);
    void delete(Long id);

    // Thêm mới
    List<ShippingResponse> search(String keyword);
}
