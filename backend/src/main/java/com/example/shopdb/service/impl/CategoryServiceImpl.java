package com.example.shopdb.service.impl;

import com.example.shopdb.dto.request.CategoryRequest;
import com.example.shopdb.dto.response.CategoryResponse;
import com.example.shopdb.entity.Category;
import com.example.shopdb.repository.CategoryRepository;
import com.example.shopdb.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;
    private final String UPLOAD_DIR = "uploads/categories/";

    @Override
    public List<CategoryResponse> getAll() {
        return repository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponse getById(Long id) {
        return repository.findById(id)
                .map(this::toResponse)
                .orElse(null);
    }

    @Override
    public CategoryResponse create(CategoryRequest request, MultipartFile image) {
        String imageUrl = saveFile(image);

        Category category = Category.builder()
                .name(request != null ? request.getName() : null)
                .imageUrl(imageUrl)
                .parent(request != null && request.getParentId() != null
                        ? Category.builder().id(request.getParentId()).build()
                        : null)
                .build();

        return toResponse(repository.save(category));
    }

    @Override
    public CategoryResponse update(Long id, CategoryRequest request, MultipartFile image) {
        return repository.findById(id).map(category -> {
            category.setName(request.getName());
            category.setParent(request.getParentId() != null
                    ? Category.builder().id(request.getParentId()).build()
                    : null);

            if (image != null && !image.isEmpty()) {
                deleteFile(category.getImageUrl());
                category.setImageUrl(saveFile(image));
            }

            return toResponse(repository.save(category));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.findById(id).ifPresent(category -> {
            deleteFile(category.getImageUrl());
            repository.delete(category);
        });
    }

    @Override
    public List<CategoryResponse> search(String keyword) {
        return repository.findByNameContainingIgnoreCase(keyword).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private String saveFile(MultipartFile file) {
        if (file == null || file.isEmpty()) return null;

        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR, fileName);
            Files.write(path, file.getBytes());

            return "/uploads/categories/" + fileName;
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi lưu ảnh category: " + e.getMessage());
        }
    }

    private void deleteFile(String fileUrl) {
        if (fileUrl == null) return;

        try {
            Path path = Paths.get(fileUrl.replaceFirst("/uploads/categories/", UPLOAD_DIR));
            Files.deleteIfExists(path);
        } catch (Exception e) {
            // log lỗi nếu cần
        }
    }

    private CategoryResponse toResponse(Category category) {
        Long parentId = category.getParent() != null ? category.getParent().getId() : null;
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .imageUrl(category.getImageUrl())
                .parentId(parentId)
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }
}
