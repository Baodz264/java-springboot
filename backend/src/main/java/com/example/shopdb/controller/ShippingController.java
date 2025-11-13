package com.example.shopdb.controller;

import com.example.shopdb.dto.response.ShippingResponse;
import com.example.shopdb.dto.request.ShippingRequest;
import com.example.shopdb.service.ShippingService;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/shippings")
@RequiredArgsConstructor
public class ShippingController {

    private final ShippingService service;

    @GetMapping
    public CollectionModel<EntityModel<ShippingResponse>> getAll() {
        List<EntityModel<ShippingResponse>> shippings = service.getAll()
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                shippings,
                linkTo(methodOn(ShippingController.class).getAll()).withSelfRel()
        );
    }

    @GetMapping("/{id}")
    public EntityModel<ShippingResponse> getById(@PathVariable Long id) {
        ShippingResponse shipping = service.getById(id);
        return toModel(shipping);
    }

    @PostMapping
    public EntityModel<ShippingResponse> create(@RequestBody ShippingRequest request) {
        ShippingResponse saved = service.create(request);
        return toModel(saved);
    }

    @PutMapping("/{id}")
    public EntityModel<ShippingResponse> update(@PathVariable Long id, @RequestBody ShippingRequest request) {
        ShippingResponse updated = service.update(id, request);
        return toModel(updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/search")
    public CollectionModel<EntityModel<ShippingResponse>> search(@RequestParam String keyword) {
        List<EntityModel<ShippingResponse>> shippings = service.search(keyword)
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                shippings,
                linkTo(methodOn(ShippingController.class).search(keyword)).withSelfRel()
        );
    }

    // ✅ HATEOAS helper
    private EntityModel<ShippingResponse> toModel(ShippingResponse shipping) {
        return EntityModel.of(
                shipping,
                linkTo(methodOn(ShippingController.class).getById(shipping.getId())).withSelfRel(),
                linkTo(methodOn(ShippingController.class).getAll()).withRel("all-shippings"),
                linkTo(ShippingController.class).slash(shipping.getId()).withRel("delete-shipping")
        );
    }
}
