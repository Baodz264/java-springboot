package com.example.shopdb.service.impl;

import com.example.shopdb.dto.request.BannerRequest;
import com.example.shopdb.dto.response.BannerResponse;
import com.example.shopdb.entity.Banner;
import com.example.shopdb.repository.BannerRepository;
import com.example.shopdb.service.BannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BannerServiceImpl implements BannerService {

    private final BannerRepository repository;
    private final String UPLOAD_DIR = "uploads/banners/";

    @Override
    public List<BannerResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public BannerResponse getById(Long id) {
        return repository.findById(id).map(this::toResponse).orElse(null);
    }

    @Override
    public BannerResponse create(BannerRequest request, MultipartFile image) {
        String imageUrl = saveImage(image);

        Banner banner = Banner.builder()
                .title(request.getTitle())
                .imageUrl(imageUrl)
                .link(request.getLink())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(request.getStatus())
                .build();

        return toResponse(repository.save(banner));
    }

    @Override
    public BannerResponse update(Long id, BannerRequest request, MultipartFile image) {
        return repository.findById(id).map(banner -> {
            banner.setTitle(request.getTitle());
            banner.setLink(request.getLink());
            banner.setStartDate(request.getStartDate());
            banner.setEndDate(request.getEndDate());
            banner.setStatus(request.getStatus());

            if (image != null && !image.isEmpty()) {
                deleteImage(banner.getImageUrl());
                banner.setImageUrl(saveImage(image));
            }

            return toResponse(repository.save(banner));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.findById(id).ifPresent(banner -> {
            deleteImage(banner.getImageUrl());
            repository.delete(banner);
        });
    }

    @Override
    public List<BannerResponse> search(String keyword) {
        return repository.findByTitleContainingIgnoreCase(keyword)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    // Lưu ảnh
    private String saveImage(MultipartFile file) {
        if (file == null || file.isEmpty()) return null;
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR, fileName);
            Files.write(path, file.getBytes(), StandardOpenOption.CREATE);
            return "/uploads/banners/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi lưu ảnh: " + e.getMessage());
        }
    }

    // Xóa ảnh
    private void deleteImage(String imageUrl) {
        if (imageUrl == null) return;
        try {
            Path path = Paths.get(imageUrl.replaceFirst("/uploads/banners/", UPLOAD_DIR));
            Files.deleteIfExists(path);
        } catch (IOException ignored) {}
    }

    private BannerResponse toResponse(Banner banner) {
        return BannerResponse.builder()
                .id(banner.getId())
                .title(banner.getTitle())
                .imageUrl(banner.getImageUrl())
                .link(banner.getLink())
                .startDate(banner.getStartDate())
                .endDate(banner.getEndDate())
                .status(banner.getStatus())
                .createdAt(banner.getCreatedAt())
                .updatedAt(banner.getUpdatedAt())
                .build();
    }
}
