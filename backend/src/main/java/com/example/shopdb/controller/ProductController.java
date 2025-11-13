package com.example.shopdb.controller;

import com.example.shopdb.dto.response.ProductResponse;
import com.example.shopdb.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    // ✅ Lấy tất cả sản phẩm
    @GetMapping
    public CollectionModel<EntityModel<ProductResponse>> getAll() {
        List<EntityModel<ProductResponse>> products = service.getAll()
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                products,
                linkTo(methodOn(ProductController.class).getAll()).withSelfRel()
        );
    }

    // ✅ Lấy sản phẩm theo ID
    @GetMapping("/{id}")
    public EntityModel<ProductResponse> getById(@PathVariable Long id) {
        ProductResponse product = service.getById(id);
        return toModel(product);
    }

    // ✅ Tạo sản phẩm mới (upload ảnh lên Cloudinary)
    @PostMapping(consumes = {"multipart/form-data"})
    public EntityModel<ProductResponse> create(
            @RequestPart("product") String productJson,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws Exception {
        ProductResponse product = service.create(productJson, image);
        return toModel(product);
    }

    // ✅ Cập nhật sản phẩm (upload ảnh mới nếu có)
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public EntityModel<ProductResponse> update(
            @PathVariable Long id,
            @RequestPart("product") String productJson,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws Exception {
        ProductResponse product = service.update(id, productJson, image);
        return toModel(product);
    }

    // ✅ Xóa sản phẩm
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // ✅ Tìm kiếm nâng cao
    @GetMapping("/search")
    public CollectionModel<EntityModel<ProductResponse>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long brandId
    ) {
        List<EntityModel<ProductResponse>> products = service.search(keyword, minPrice, maxPrice, categoryId, brandId)
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                products,
                linkTo(methodOn(ProductController.class).search(keyword, minPrice, maxPrice, categoryId, brandId)).withSelfRel()
        );
    }

    // ✅ HATEOAS helper
    private EntityModel<ProductResponse> toModel(ProductResponse product) {
        return EntityModel.of(
                product,
                linkTo(methodOn(ProductController.class).getById(product.getId())).withSelfRel(),
                linkTo(methodOn(ProductController.class).getAll()).withRel("all-products"),
                linkTo(ProductController.class).slash(product.getId()).withRel("delete-product")
        );
    }
}
