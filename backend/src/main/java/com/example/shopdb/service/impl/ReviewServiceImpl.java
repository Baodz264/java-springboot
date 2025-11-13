package com.example.shopdb.service.impl;

import com.example.shopdb.dto.request.ReviewRequest;
import com.example.shopdb.dto.response.ReviewResponse;
import com.example.shopdb.entity.Product;
import com.example.shopdb.entity.Review;
import com.example.shopdb.entity.User;
import com.example.shopdb.repository.ProductRepository;
import com.example.shopdb.repository.ReviewRepository;
import com.example.shopdb.repository.UserRepository;
import com.example.shopdb.service.ReviewService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository repository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    private final String UPLOAD_DIR = "uploads/reviews/";

    @Override
    public List<ReviewResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public ReviewResponse getById(Long id) {
        return repository.findById(id).map(this::toResponse).orElse(null);
    }

    @Override
    public ReviewResponse create(String reviewJson, MultipartFile image) throws Exception {
        ReviewRequest request = objectMapper.readValue(reviewJson, ReviewRequest.class);
        String imageUrl = saveImage(image);

        Product product = productRepository.findById(request.getProductId()).orElse(null);
        User user = userRepository.findById(request.getUserId()).orElse(null);

        Review review = Review.builder()
                .rating(request.getRating())
                .comment(request.getComment())
                .imageUrl(imageUrl)
                .likes(request.getLikes())
                .product(product)
                .user(user)
                .build();

        return toResponse(repository.save(review));
    }

    @Override
    public ReviewResponse update(Long id, String reviewJson, MultipartFile image) throws Exception {
        ReviewRequest request = objectMapper.readValue(reviewJson, ReviewRequest.class);

        return repository.findById(id).map(review -> {
            Product product = productRepository.findById(request.getProductId()).orElse(null);
            User user = userRepository.findById(request.getUserId()).orElse(null);

            review.setRating(request.getRating());
            review.setComment(request.getComment());
            review.setLikes(request.getLikes());
            review.setProduct(product);
            review.setUser(user);

            if (image != null && !image.isEmpty()) {
                deleteImage(review.getImageUrl());
                review.setImageUrl(saveImage(image));
            }

            return toResponse(repository.save(review));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.findById(id).ifPresent(review -> {
            deleteImage(review.getImageUrl());
            repository.delete(review);
        });
    }

    // ✅ Search
    @Override
    public List<ReviewResponse> search(String keyword, Long productId, Long userId, Integer minRating, Integer maxRating) {
        List<Review> reviews = repository.findAll();

        return reviews.stream()
                .filter(r -> keyword == null || r.getComment().toLowerCase().contains(keyword.toLowerCase()))
                .filter(r -> productId == null || (r.getProduct() != null && r.getProduct().getId().equals(productId)))
                .filter(r -> userId == null || (r.getUser() != null && r.getUser().getId().equals(userId)))
                .filter(r -> (minRating == null || r.getRating() >= minRating) &&
                             (maxRating == null || r.getRating() <= maxRating))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private String saveImage(MultipartFile file) {
        if (file == null || file.isEmpty()) return null;

        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR, fileName);
            Files.write(path, file.getBytes(), StandardOpenOption.CREATE);
            return "/uploads/reviews/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi lưu ảnh: " + e.getMessage());
        }
    }

    private void deleteImage(String imageUrl) {
        if (imageUrl == null) return;
        try {
            Path path = Paths.get(imageUrl.replaceFirst("/uploads/reviews/", UPLOAD_DIR));
            Files.deleteIfExists(path);
        } catch (IOException e) {
            // Optional: log lỗi
        }
    }

    private ReviewResponse toResponse(Review review) {
        Long productId = review.getProduct() != null ? review.getProduct().getId() : null;
        Long userId = review.getUser() != null ? review.getUser().getId() : null;

        return ReviewResponse.builder()
                .id(review.getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .imageUrl(review.getImageUrl())
                .likes(review.getLikes())
                .productId(productId)
                .userId(userId)
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .build();
    }
}
