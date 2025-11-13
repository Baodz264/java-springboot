package com.example.shopdb.controller;

import com.example.shopdb.dto.response.VoucherResponse;
import com.example.shopdb.service.VoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/vouchers")
@RequiredArgsConstructor
public class VoucherController {

    private final VoucherService service;

    @GetMapping
    public CollectionModel<EntityModel<VoucherResponse>> getAll() {
        List<EntityModel<VoucherResponse>> vouchers = service.getAll()
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                vouchers,
                linkTo(methodOn(VoucherController.class).getAll()).withSelfRel()
        );
    }

    @GetMapping("/{id}")
    public EntityModel<VoucherResponse> getById(@PathVariable Long id) {
        return toModel(service.getById(id));
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public EntityModel<VoucherResponse> create(@RequestPart("voucher") String voucherJson,
                                               @RequestPart(value = "image", required = false) MultipartFile image) throws Exception {
        return toModel(service.create(voucherJson, image));
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public EntityModel<VoucherResponse> update(@PathVariable Long id,
                                               @RequestPart("voucher") String voucherJson,
                                               @RequestPart(value = "image", required = false) MultipartFile image) throws Exception {
        return toModel(service.update(id, voucherJson, image));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/search")
    public CollectionModel<EntityModel<VoucherResponse>> search(@RequestParam String keyword) {
        List<EntityModel<VoucherResponse>> vouchers = service.search(keyword)
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                vouchers,
                linkTo(methodOn(VoucherController.class).search(keyword)).withSelfRel()
        );
    }

    // ✅ HATEOAS helper
    private EntityModel<VoucherResponse> toModel(VoucherResponse voucher) {
        return EntityModel.of(
                voucher,
                linkTo(methodOn(VoucherController.class).getById(voucher.getId())).withSelfRel(),
                linkTo(methodOn(VoucherController.class).getAll()).withRel("all-vouchers"),
                linkTo(VoucherController.class).slash(voucher.getId()).withRel("delete-voucher")
        );
    }
}
