package com.example.shopdb.service;

import com.example.shopdb.dto.request.ProductVariantRequest;
import com.example.shopdb.dto.response.ProductVariantResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductVariantService {
    List<ProductVariantResponse> getAll();
    ProductVariantResponse getById(Long id);
    ProductVariantResponse create(ProductVariantRequest request, MultipartFile image);
    ProductVariantResponse update(Long id, ProductVariantRequest request, MultipartFile image);
    void delete(Long id);
}
