package com.example.shopdb.service;

import com.example.shopdb.dto.request.BrandRequest;
import com.example.shopdb.dto.response.BrandResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BrandService {
    List<BrandResponse> getAll();
    BrandResponse getById(Long id);
    BrandResponse create(BrandRequest request, MultipartFile logo);
    BrandResponse update(Long id, BrandRequest request, MultipartFile logo);
    void delete(Long id);

    // ✅ search
    List<BrandResponse> search(String keyword);
}
