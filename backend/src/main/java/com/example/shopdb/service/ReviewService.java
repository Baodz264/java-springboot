package com.example.shopdb.service;

import com.example.shopdb.dto.response.ReviewResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ReviewService {
    List<ReviewResponse> getAll();
    ReviewResponse getById(Long id);
    ReviewResponse create(String reviewJson, MultipartFile image) throws Exception;
    ReviewResponse update(Long id, String reviewJson, MultipartFile image) throws Exception;
    void delete(Long id);

    // ✅ Search review
    List<ReviewResponse> search(String keyword, Long productId, Long userId, Integer minRating, Integer maxRating);
}
