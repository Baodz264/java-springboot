package com.example.shopdb.service.impl;

import com.example.shopdb.dto.request.BrandRequest;
import com.example.shopdb.dto.response.BrandResponse;
import com.example.shopdb.entity.Brand;
import com.example.shopdb.repository.BrandRepository;
import com.example.shopdb.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {

    private final BrandRepository repository;

    // tốt hơn đặt trong application.properties và inject bằng @Value
    private final Path UPLOAD_DIR = Paths.get("uploads", "brands");

    @Override
    public List<BrandResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public BrandResponse getById(Long id) {
        return repository.findById(id).map(this::toResponse).orElse(null);
    }

    @Override
    public BrandResponse create(BrandRequest request, MultipartFile logo) {
        String logoUrl = saveLogo(logo);

        Brand brand = Brand.builder()
                .name(request != null ? request.getName() : null)
                .description(request != null ? request.getDescription() : null) // <-- map description
                .logoUrl(logoUrl)
                .status(request != null ? request.getStatus() : true)
                .build();

        return toResponse(repository.save(brand));
    }

    @Override
    public BrandResponse update(Long id, BrandRequest request, MultipartFile logo) {
        return repository.findById(id).map(brand -> {
            // map tất cả field cần thiết
            brand.setName(request.getName());
            brand.setDescription(request.getDescription()); // <-- map description
            brand.setStatus(request.getStatus());

            if (logo != null && !logo.isEmpty()) {
                // xóa file cũ (nếu có) rồi lưu file mới
                deleteLogo(brand.getLogoUrl());
                brand.setLogoUrl(saveLogo(logo));
            }

            return toResponse(repository.save(brand));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.findById(id).ifPresent(brand -> {
            deleteLogo(brand.getLogoUrl());
            repository.delete(brand);
        });
    }

    @Override
    public List<BrandResponse> search(String keyword) {
        return repository.findByNameContainingIgnoreCase(keyword)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    // lưu logo an toàn: tạo thư mục, đổi tên bằng UUID, copy stream
    private String saveLogo(MultipartFile file) {
        if (file == null || file.isEmpty()) return null;

        try {
            Files.createDirectories(UPLOAD_DIR);

            // sanitize original filename and create unique name
            String original = Paths.get(file.getOriginalFilename()).getFileName().toString();
            String clean = original.replaceAll("[^a-zA-Z0-9\\.\\-\\_]", "_");
            String fileName = UUID.randomUUID().toString() + "_" + clean;

            Path target = UPLOAD_DIR.resolve(fileName).normalize();
            try (InputStream in = file.getInputStream()) {
                Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);
            }

            // URL trả về nên bắt đầu bằng /uploads/... để frontend dễ build url
            return "/uploads/brands/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi lưu logo: " + e.getMessage(), e);
        }
    }

    // xóa logo an toàn
    private void deleteLogo(String logoUrl) {
        if (logoUrl == null || logoUrl.isBlank()) return;
        try {
            // lấy filename từ logoUrl (ví dụ "/uploads/brands/uuid_name.jpg" -> "uuid_name.jpg")
            Path urlPath = Paths.get(logoUrl);
            String fileName = urlPath.getFileName().toString();
            Path path = UPLOAD_DIR.resolve(fileName).normalize();
            Files.deleteIfExists(path);
        } catch (Exception ignored) {
        }
    }

    private BrandResponse toResponse(Brand brand) {
        return BrandResponse.builder()
                .id(brand.getId())
                .name(brand.getName())
                .description(brand.getDescription()) // <-- include description
                .logoUrl(brand.getLogoUrl())
                .status(brand.getStatus())
                .createdAt(brand.getCreatedAt())
                .updatedAt(brand.getUpdatedAt())
                .build();
    }
}
