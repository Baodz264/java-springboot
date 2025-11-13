package com.example.shopdb.controller;

import com.example.shopdb.dto.request.ProductImageRequest;
import com.example.shopdb.dto.response.ProductImageResponse;
import com.example.shopdb.service.ProductImageService;
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
@RequestMapping("/api/product-images")
@RequiredArgsConstructor
public class ProductImageController {

    private final ProductImageService service;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    @GetMapping
    public CollectionModel<EntityModel<ProductImageResponse>> getAll() {
        List<EntityModel<ProductImageResponse>> images = service.getAll()
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                images,
                linkTo(methodOn(ProductImageController.class).getAll()).withSelfRel()
        );
    }

    @GetMapping("/{id}")
    public EntityModel<ProductImageResponse> getById(@PathVariable Long id) {
        ProductImageResponse image = service.getById(id);
        return toModel(image);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public EntityModel<ProductImageResponse> create(@RequestPart("productImage") String productImageJson,
                                                    @RequestPart(value = "image", required = false) MultipartFile image) throws Exception {
        ProductImageRequest request = objectMapper.readValue(productImageJson, ProductImageRequest.class);
        ProductImageResponse saved = service.create(request, image);
        return toModel(saved);
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public EntityModel<ProductImageResponse> update(@PathVariable Long id,
                                                    @RequestPart("productImage") String productImageJson,
                                                    @RequestPart(value = "image", required = false) MultipartFile image) throws Exception {
        ProductImageRequest request = objectMapper.readValue(productImageJson, ProductImageRequest.class);
        ProductImageResponse updated = service.update(id, request, image);
        return toModel(updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // ✅ HATEOAS helper
    private EntityModel<ProductImageResponse> toModel(ProductImageResponse image) {
        return EntityModel.of(
                image,
                linkTo(methodOn(ProductImageController.class).getById(image.getId())).withSelfRel(),
                linkTo(methodOn(ProductImageController.class).getAll()).withRel("all-product-images"),
                linkTo(ProductImageController.class).slash(image.getId()).withRel("delete-product-image")
        );
    }
}
