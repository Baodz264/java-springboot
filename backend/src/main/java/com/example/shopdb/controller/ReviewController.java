package com.example.shopdb.controller;

import com.example.shopdb.dto.response.ReviewResponse;
import com.example.shopdb.service.ReviewService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService service;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    @GetMapping
    public CollectionModel<EntityModel<ReviewResponse>> getAll() {
        List<EntityModel<ReviewResponse>> reviews = service.getAll()
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                reviews,
                linkTo(methodOn(ReviewController.class).getAll()).withSelfRel()
        );
    }

    @GetMapping("/{id}")
    public EntityModel<ReviewResponse> getById(@PathVariable Long id) {
        ReviewResponse review = service.getById(id);
        return toModel(review);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public EntityModel<ReviewResponse> create(@RequestPart("review") String reviewJson,
                                              @RequestPart(value = "image", required = false) MultipartFile image) throws Exception {
        ReviewResponse saved = service.create(reviewJson, image);
        return toModel(saved);
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public EntityModel<ReviewResponse> update(@PathVariable Long id,
                                              @RequestPart("review") String reviewJson,
                                              @RequestPart(value = "image", required = false) MultipartFile image) throws Exception {
        ReviewResponse updated = service.update(id, reviewJson, image);
        return toModel(updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // ✅ Search API
    @GetMapping("/search")
    public CollectionModel<EntityModel<ReviewResponse>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long productId,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) Integer minRating,
            @RequestParam(required = false) Integer maxRating
    ) {
        List<EntityModel<ReviewResponse>> reviews = service.search(keyword, productId, userId, minRating, maxRating)
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                reviews,
                linkTo(methodOn(ReviewController.class).search(keyword, productId, userId, minRating, maxRating)).withSelfRel()
        );
    }

    // ✅ HATEOAS helper
    private EntityModel<ReviewResponse> toModel(ReviewResponse review) {
        return EntityModel.of(
                review,
                linkTo(methodOn(ReviewController.class).getById(review.getId())).withSelfRel(),
                linkTo(methodOn(ReviewController.class).getAll()).withRel("all-reviews"),
                linkTo(ReviewController.class).slash(review.getId()).withRel("delete-review")
        );
    }
}
