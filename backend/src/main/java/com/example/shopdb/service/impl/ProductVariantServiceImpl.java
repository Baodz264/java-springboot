package com.example.shopdb.service.impl;

import com.example.shopdb.dto.request.ProductVariantRequest;
import com.example.shopdb.dto.response.ProductVariantResponse;
import com.example.shopdb.entity.Product;
import com.example.shopdb.entity.ProductVariant;
import com.example.shopdb.repository.ProductRepository;
import com.example.shopdb.repository.ProductVariantRepository;
import com.example.shopdb.service.ProductVariantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductVariantServiceImpl implements ProductVariantService {

    private final ProductVariantRepository repository;
    private final ProductRepository productRepository;

    private final String UPLOAD_DIR = "uploads/product-variants/";

    @Override
    public List<ProductVariantResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public ProductVariantResponse getById(Long id) {
        return repository.findById(id).map(this::toResponse).orElse(null);
    }

    @Override
    public ProductVariantResponse create(ProductVariantRequest request, MultipartFile image) {
        Product product = productRepository.findById(request.getProductId()).orElse(null);
        String imageUrl = saveImage(image);

        ProductVariant variant = ProductVariant.builder()
                .size(request.getSize())
                .color(request.getColor())
                .extraPrice(request.getExtraPrice())
                .stock(request.getStock())
                .imageUrl(imageUrl)
                .product(product)
                .build();

        return toResponse(repository.save(variant));
    }

    @Override
    public ProductVariantResponse update(Long id, ProductVariantRequest request, MultipartFile image) {
        return repository.findById(id).map(variant -> {
            Product product = productRepository.findById(request.getProductId()).orElse(null);

            variant.setSize(request.getSize());
            variant.setColor(request.getColor());
            variant.setExtraPrice(request.getExtraPrice());
            variant.setStock(request.getStock());
            variant.setProduct(product);

            if (image != null && !image.isEmpty()) {
                deleteImage(variant.getImageUrl());
                variant.setImageUrl(saveImage(image));
            }

            return toResponse(repository.save(variant));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.findById(id).ifPresent(variant -> {
            deleteImage(variant.getImageUrl());
            repository.delete(variant);
        });
    }

    // Lưu ảnh
    private String saveImage(MultipartFile file) {
        if (file == null || file.isEmpty()) return null;
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR, fileName);
            Files.write(path, file.getBytes(), StandardOpenOption.CREATE);
            return "/uploads/product-variants/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi lưu ảnh: " + e.getMessage());
        }
    }

    // Xóa ảnh
    private void deleteImage(String imageUrl) {
        if (imageUrl == null) return;
        try {
            Path path = Paths.get(imageUrl.replaceFirst("/uploads/product-variants/", UPLOAD_DIR));
            Files.deleteIfExists(path);
        } catch (IOException e) {
            // log optional
        }
    }

    private ProductVariantResponse toResponse(ProductVariant variant) {
        Long productId = variant.getProduct() != null ? variant.getProduct().getId() : null;
        return ProductVariantResponse.builder()
                .id(variant.getId())
                .size(variant.getSize())
                .color(variant.getColor())
                .extraPrice(variant.getExtraPrice())
                .stock(variant.getStock())
                .imageUrl(variant.getImageUrl())
                .productId(productId)
                .createdAt(variant.getCreatedAt())
                .updatedAt(variant.getUpdatedAt())
                .build();
    }
}
