package com.example.shopdb.controller;

import com.example.shopdb.dto.request.CategoryRequest;
import com.example.shopdb.dto.response.CategoryResponse;
import com.example.shopdb.service.CategoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.CollectionModel;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService service;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    @GetMapping
    public CollectionModel<EntityModel<CategoryResponse>> getAll() {
        List<EntityModel<CategoryResponse>> categories = service.getAll().stream()
                .map(this::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(
                categories,
                linkTo(methodOn(CategoryController.class).getAll()).withSelfRel()
        );
    }

    @GetMapping("/{id}")
    public EntityModel<CategoryResponse> getById(@PathVariable Long id) {
        CategoryResponse category = service.getById(id);
        return toModel(category);
    }

    @GetMapping("/search")
    public CollectionModel<EntityModel<CategoryResponse>> search(@RequestParam String keyword) {
        List<EntityModel<CategoryResponse>> categories = service.search(keyword).stream()
                .map(this::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(
                categories,
                linkTo(methodOn(CategoryController.class).search(keyword)).withSelfRel()
        );
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public EntityModel<CategoryResponse> create(@RequestPart("category") String categoryJson,
                                                @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            CategoryRequest request = objectMapper.readValue(categoryJson, CategoryRequest.class);
            CategoryResponse category = service.create(request, image);
            return toModel(category);
        } catch (Exception e) {
            throw new RuntimeException("Error creating category", e);
        }
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public EntityModel<CategoryResponse> update(@PathVariable Long id,
                                                @RequestPart("category") String categoryJson,
                                                @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            CategoryRequest request = objectMapper.readValue(categoryJson, CategoryRequest.class);
            CategoryResponse category = service.update(id, request, image);
            return toModel(category);
        } catch (Exception e) {
            throw new RuntimeException("Error updating category", e);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // ✅ HATEOAS links
    private EntityModel<CategoryResponse> toModel(CategoryResponse category) {
        return EntityModel.of(
                category,
                linkTo(methodOn(CategoryController.class).getById(category.getId())).withSelfRel(),
                linkTo(methodOn(CategoryController.class).getAll()).withRel("all-categories"),
                linkTo(CategoryController.class).slash(category.getId()).withRel("delete-category")
        );
    }
}
