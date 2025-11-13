package com.example.shopdb.service;

import com.example.shopdb.dto.request.CategoryRequest;
import com.example.shopdb.dto.response.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAll();
    CategoryResponse getById(Long id);
    CategoryResponse create(CategoryRequest request, MultipartFile image);
    CategoryResponse update(Long id, CategoryRequest request, MultipartFile image);
    void delete(Long id);
    List<CategoryResponse> search(String keyword);
}
