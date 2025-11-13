package com.example.shopdb.controller;

import com.example.shopdb.dto.request.BannerRequest;
import com.example.shopdb.dto.response.BannerResponse;
import com.example.shopdb.service.BannerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/banners")
@RequiredArgsConstructor
public class BannerController {

    private final BannerService service;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    // Lấy tất cả banner
    @GetMapping
    public CollectionModel<EntityModel<BannerResponse>> getAll() {
        List<EntityModel<BannerResponse>> banners = service.getAll().stream()
                .map(this::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(
                banners,
                linkTo(methodOn(BannerController.class).getAll()).withSelfRel()
        );
    }

    // Lấy banner theo ID
    @GetMapping("/{id}")
    public EntityModel<BannerResponse> getById(@PathVariable Long id) {
        BannerResponse banner = service.getById(id);
        return toModel(banner);
    }

    // Tìm kiếm banner theo từ khóa
    @GetMapping("/search")
    public CollectionModel<EntityModel<BannerResponse>> search(@RequestParam("keyword") String keyword) {
        List<EntityModel<BannerResponse>> banners = service.search(keyword).stream()
                .map(this::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(
                banners,
                linkTo(methodOn(BannerController.class).search(keyword)).withSelfRel()
        );
    }

    // Tạo banner mới
    @PostMapping(consumes = {"multipart/form-data"})
    public EntityModel<BannerResponse> create(@RequestPart("banner") String bannerJson,
                                              @RequestPart(value = "image", required = false) MultipartFile image) throws Exception {
        BannerRequest request = objectMapper.readValue(bannerJson, BannerRequest.class);
        BannerResponse banner = service.create(request, image);
        return toModel(banner);
    }

    // Cập nhật banner
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public EntityModel<BannerResponse> update(@PathVariable Long id,
                                              @RequestPart("banner") String bannerJson,
                                              @RequestPart(value = "image", required = false) MultipartFile image) throws Exception {
        BannerRequest request = objectMapper.readValue(bannerJson, BannerRequest.class);
        BannerResponse banner = service.update(id, request, image);
        return toModel(banner);
    }

    // Xóa banner
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build(); // trả về 204
    }

    // Chuyển BannerResponse thành HATEOAS EntityModel
    private EntityModel<BannerResponse> toModel(BannerResponse banner) {
        return EntityModel.of(
                banner,
                linkTo(methodOn(BannerController.class).getById(banner.getId())).withSelfRel(),
                linkTo(methodOn(BannerController.class).getAll()).withRel("all-banners"),
                linkTo(methodOn(BannerController.class).delete(banner.getId())).withRel("delete-banner")
        );
    }
}
