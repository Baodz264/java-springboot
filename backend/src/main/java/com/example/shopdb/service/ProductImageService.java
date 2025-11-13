package com.example.shopdb.service;

import com.example.shopdb.dto.request.ProductImageRequest;
import com.example.shopdb.dto.response.ProductImageResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductImageService {
    List<ProductImageResponse> getAll();
    ProductImageResponse getById(Long id);
    ProductImageResponse create(ProductImageRequest request, MultipartFile image);
    ProductImageResponse update(Long id, ProductImageRequest request, MultipartFile image);
    void delete(Long id);
}
