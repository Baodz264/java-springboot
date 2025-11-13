package com.example.shopdb.controller;

import com.example.shopdb.dto.request.BrandRequest;
import com.example.shopdb.dto.response.BrandResponse;
import com.example.shopdb.service.BrandService;
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
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {

    private final BrandService service;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    @GetMapping
    public CollectionModel<EntityModel<BrandResponse>> getAll() {
        List<EntityModel<BrandResponse>> brands = service.getAll().stream()
                .map(this::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(
                brands,
                linkTo(methodOn(BrandController.class).getAll()).withSelfRel()
        );
    }

    @GetMapping("/{id}")
    public EntityModel<BrandResponse> getById(@PathVariable Long id) {
        BrandResponse brand = service.getById(id);
        return toModel(brand);
    }

    @GetMapping("/search")
    public CollectionModel<EntityModel<BrandResponse>> search(@RequestParam("keyword") String keyword) {
        List<EntityModel<BrandResponse>> brands = service.search(keyword).stream()
                .map(this::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(
                brands,
                linkTo(methodOn(BrandController.class).search(keyword)).withSelfRel()
        );
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public EntityModel<BrandResponse> create(@RequestPart("brand") String brandJson,
                                             @RequestPart(value = "logo", required = false) MultipartFile logo) {
        try {
            BrandRequest request = objectMapper.readValue(brandJson, BrandRequest.class);
            BrandResponse brand = service.create(request, logo);
            return toModel(brand);
        } catch (Exception e) {
            throw new RuntimeException("Error creating brand", e);
        }
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public EntityModel<BrandResponse> update(@PathVariable Long id,
                                             @RequestPart("brand") String brandJson,
                                             @RequestPart(value = "logo", required = false) MultipartFile logo) {
        try {
            BrandRequest request = objectMapper.readValue(brandJson, BrandRequest.class);
            BrandResponse brand = service.update(id, request, logo);
            return toModel(brand);
        } catch (Exception e) {
            throw new RuntimeException("Error updating brand", e);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // ✅ HATEOAS
    private EntityModel<BrandResponse> toModel(BrandResponse brand) {
        return EntityModel.of(
                brand,
                linkTo(methodOn(BrandController.class).getById(brand.getId())).withSelfRel(),
                linkTo(methodOn(BrandController.class).getAll()).withRel("all-brands"),
                linkTo(BrandController.class).slash(brand.getId()).withRel("delete-brand")
        );
    }
}
