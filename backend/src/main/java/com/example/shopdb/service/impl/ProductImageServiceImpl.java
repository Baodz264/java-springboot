package com.example.shopdb.service.impl;

import com.example.shopdb.dto.request.ProductImageRequest;
import com.example.shopdb.dto.response.ProductImageResponse;
import com.example.shopdb.entity.Product;
import com.example.shopdb.entity.ProductImage;
import com.example.shopdb.repository.ProductImageRepository;
import com.example.shopdb.repository.ProductRepository;
import com.example.shopdb.service.ProductImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductImageRepository repository;
    private final ProductRepository productRepository;
    private final String UPLOAD_DIR = "uploads/product-images/";

    @Override
    public List<ProductImageResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public ProductImageResponse getById(Long id) {
        return repository.findById(id).map(this::toResponse).orElse(null);
    }

    @Override
    public ProductImageResponse create(ProductImageRequest request, MultipartFile image) {
        String imageUrl = saveImage(image);

        Product product = productRepository.findById(request.getProductId()).orElse(null);
        ProductImage productImage = ProductImage.builder()
                .imageUrl(imageUrl)
                .product(product)
                .build();

        return toResponse(repository.save(productImage));
    }

    @Override
    public ProductImageResponse update(Long id, ProductImageRequest request, MultipartFile image) {
        return repository.findById(id).map(productImage -> {
            Product product = productRepository.findById(request.getProductId()).orElse(null);
            productImage.setProduct(product);

            if (image != null && !image.isEmpty()) {
                deleteImage(productImage.getImageUrl());
                productImage.setImageUrl(saveImage(image));
            }

            return toResponse(repository.save(productImage));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.findById(id).ifPresent(image -> {
            deleteImage(image.getImageUrl());
            repository.delete(image);
        });
    }

    private String saveImage(MultipartFile file) {
        if (file == null || file.isEmpty()) return null;

        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR, fileName);
            Files.write(path, file.getBytes(), StandardOpenOption.CREATE);
            return "/uploads/product-images/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi lưu ảnh: " + e.getMessage());
        }
    }

    private void deleteImage(String imageUrl) {
        if (imageUrl == null) return;

        try {
            Path path = Paths.get(imageUrl.replaceFirst("/uploads/product-images/", UPLOAD_DIR));
            Files.deleteIfExists(path);
        } catch (IOException e) {
            // Optional: log lỗi
        }
    }

    private ProductImageResponse toResponse(ProductImage image) {
        Long productId = image.getProduct() != null ? image.getProduct().getId() : null;
        return ProductImageResponse.builder()
                .id(image.getId())
                .imageUrl(image.getImageUrl())
                .productId(productId)
                .createdAt(image.getCreatedAt())
                .updatedAt(image.getUpdatedAt())
                .build();
    }
}
