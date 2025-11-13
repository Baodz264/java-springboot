package com.example.shopdb.service;

import com.example.shopdb.dto.request.BannerRequest;
import com.example.shopdb.dto.response.BannerResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BannerService {
    List<BannerResponse> getAll();
    BannerResponse getById(Long id);
    BannerResponse create(BannerRequest request, MultipartFile image);
    BannerResponse update(Long id, BannerRequest request, MultipartFile image);
    void delete(Long id);

    // ✅ chức năng search
    List<BannerResponse> search(String keyword);
}
