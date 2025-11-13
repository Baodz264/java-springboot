package com.example.shopdb.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.shopdb.dto.request.ProductRequest;
import com.example.shopdb.dto.response.ProductResponse;
import com.example.shopdb.entity.Brand;
import com.example.shopdb.entity.Category;
import com.example.shopdb.entity.Product;
import com.example.shopdb.repository.BrandRepository;
import com.example.shopdb.repository.CategoryRepository;
import com.example.shopdb.repository.ProductRepository;
import com.example.shopdb.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final Cloudinary cloudinary;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    @Override
    public List<ProductResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public ProductResponse getById(Long id) {
        return repository.findById(id).map(this::toResponse).orElse(null);
    }

    @Override
    public ProductResponse create(String productJson, MultipartFile image) throws Exception {
        ProductRequest request = objectMapper.readValue(productJson, ProductRequest.class);
        String imageUrl = uploadToCloudinary(image);

        Category category = categoryRepository.findById(request.getCategoryId()).orElse(null);
        Brand brand = brandRepository.findById(request.getBrandId()).orElse(null);

        Product product = Product.builder()
                .sku(request.getSku())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock())
                .thumbnailUrl(imageUrl)
                .status(request.getStatus())
                .category(category)
                .brand(brand)
                .build();

        return toResponse(repository.save(product));
    }

    @Override
    public ProductResponse update(Long id, String productJson, MultipartFile image) throws Exception {
        ProductRequest request = objectMapper.readValue(productJson, ProductRequest.class);

        return repository.findById(id).map(product -> {
            Category category = categoryRepository.findById(request.getCategoryId()).orElse(null);
            Brand brand = brandRepository.findById(request.getBrandId()).orElse(null);

            product.setSku(request.getSku());
            product.setName(request.getName());
            product.setDescription(request.getDescription());
            product.setPrice(request.getPrice());
            product.setStock(request.getStock());
            product.setStatus(request.getStatus());
            product.setCategory(category);
            product.setBrand(brand);

            if (image != null && !image.isEmpty()) {
                deleteFromCloudinary(product.getThumbnailUrl());
                product.setThumbnailUrl(uploadToCloudinary(image));
            }

            return toResponse(repository.save(product));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.findById(id).ifPresent(product -> {
            deleteFromCloudinary(product.getThumbnailUrl());
            repository.delete(product);
        });
    }

    @Override
    public List<ProductResponse> search(String keyword, Double minPrice, Double maxPrice, Long categoryId, Long brandId) {
        List<Product> products;

        boolean hasKeyword = keyword != null && !keyword.trim().isEmpty();
        boolean hasCategory = categoryId != null;
        boolean hasBrand = brandId != null;

        if (hasCategory && hasBrand) {
            products = repository.findByCategoryIdAndBrandId(categoryId, brandId);
        } else if (hasCategory) {
            products = repository.findByCategoryId(categoryId);
        } else if (hasBrand) {
            products = repository.findByBrandId(brandId);
        } else if (minPrice != null && maxPrice != null) {
            products = repository.findByPriceBetween(minPrice, maxPrice);
        } else if (minPrice != null) {
            products = repository.findByPriceGreaterThanEqual(minPrice);
        } else if (maxPrice != null) {
            products = repository.findByPriceLessThanEqual(maxPrice);
        } else if (hasKeyword) {
            String searchKey = keyword.trim();
            Double priceValue = null;
            try { priceValue = Double.parseDouble(searchKey); } catch (NumberFormatException ignored) {}
            if (priceValue != null) {
                products = repository.findByNameContainingIgnoreCaseOrSkuContainingIgnoreCaseOrPrice(searchKey, searchKey, priceValue);
            } else {
                products = repository.findByNameContainingIgnoreCaseOrSkuContainingIgnoreCase(searchKey, searchKey);
            }
        } else {
            products = repository.findAll();
        }

        return products.stream().map(this::toResponse).collect(Collectors.toList());
    }

    // ✅ Upload lên Cloudinary
    private String uploadToCloudinary(MultipartFile file) {
        if (file == null || file.isEmpty()) return null;
        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap("folder", "products", "resource_type", "image"));
            return uploadResult.get("secure_url").toString();
        } catch (Exception e) {
            throw new RuntimeException("Lỗi upload ảnh lên Cloudinary: " + e.getMessage());
        }
    }

    // ✅ Xóa ảnh trên Cloudinary
    private void deleteFromCloudinary(String imageUrl) {
        if (imageUrl == null || !imageUrl.contains("products/")) return;
        try {
            String publicId = imageUrl.substring(imageUrl.indexOf("products/"), imageUrl.lastIndexOf("."));
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (Exception ignored) {}
    }

    // ✅ Chuyển entity → DTO
    private ProductResponse toResponse(Product product) {
        Long categoryId = product.getCategory() != null ? product.getCategory().getId() : null;
        Long brandId = product.getBrand() != null ? product.getBrand().getId() : null;

        return ProductResponse.builder()
                .id(product.getId())
                .sku(product.getSku())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .thumbnailUrl(product.getThumbnailUrl())
                .status(product.getStatus())
                .categoryId(categoryId)
                .brandId(brandId)
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }
}
