package com.example.shopdb.controller;

import com.example.shopdb.dto.request.ProductVariantRequest;
import com.example.shopdb.dto.response.ProductVariantResponse;
import com.example.shopdb.service.ProductVariantService;
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
@RequestMapping("/api/product-variants")
@RequiredArgsConstructor
public class ProductVariantController {

    private final ProductVariantService service;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    @GetMapping
    public CollectionModel<EntityModel<ProductVariantResponse>> getAll() {
        List<EntityModel<ProductVariantResponse>> variants = service.getAll()
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                variants,
                linkTo(methodOn(ProductVariantController.class).getAll()).withSelfRel()
        );
    }

    @GetMapping("/{id}")
    public EntityModel<ProductVariantResponse> getById(@PathVariable Long id) {
        ProductVariantResponse variant = service.getById(id);
        return toModel(variant);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public EntityModel<ProductVariantResponse> create(
            @RequestPart("variant") String variantJson,
            @RequestPart(value = "image", required = false) MultipartFile image) throws Exception {

        ProductVariantRequest request = objectMapper.readValue(variantJson, ProductVariantRequest.class);
        ProductVariantResponse saved = service.create(request, image);
        return toModel(saved);
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public EntityModel<ProductVariantResponse> update(
            @PathVariable Long id,
            @RequestPart("variant") String variantJson,
            @RequestPart(value = "image", required = false) MultipartFile image) throws Exception {

        ProductVariantRequest request = objectMapper.readValue(variantJson, ProductVariantRequest.class);
        ProductVariantResponse updated = service.update(id, request, image);
        return toModel(updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // ✅ HATEOAS helper
    private EntityModel<ProductVariantResponse> toModel(ProductVariantResponse variant) {
        return EntityModel.of(
                variant,
                linkTo(methodOn(ProductVariantController.class).getById(variant.getId())).withSelfRel(),
                linkTo(methodOn(ProductVariantController.class).getAll()).withRel("all-product-variants"),
                linkTo(ProductVariantController.class).slash(variant.getId()).withRel("delete-product-variant")
        );
    }
}
