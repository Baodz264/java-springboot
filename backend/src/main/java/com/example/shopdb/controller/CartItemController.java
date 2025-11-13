package com.example.shopdb.controller;

import com.example.shopdb.dto.request.CartItemRequest;
import com.example.shopdb.dto.response.CartItemResponse;
import com.example.shopdb.service.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/cart-items")
@RequiredArgsConstructor
public class CartItemController {

    private final CartItemService service;

    @GetMapping
    public CollectionModel<EntityModel<CartItemResponse>> getAll() {
        List<EntityModel<CartItemResponse>> items = service.getAll().stream()
                .map(this::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(
                items,
                linkTo(methodOn(CartItemController.class).getAll()).withSelfRel()
        );
    }

    @GetMapping("/{id}")
    public EntityModel<CartItemResponse> getById(@PathVariable Long id) {
        CartItemResponse item = service.getById(id);
        return toModel(item);
    }

    @PostMapping
    public EntityModel<CartItemResponse> create(@RequestBody CartItemRequest request) {
        CartItemResponse item = service.create(request);
        return toModel(item);
    }

    @PutMapping("/{id}")
    public EntityModel<CartItemResponse> update(@PathVariable Long id, @RequestBody CartItemRequest request) {
        CartItemResponse item = service.update(id, request);
        return toModel(item);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/search/by-cart")
    public CollectionModel<EntityModel<CartItemResponse>> searchByCart(@RequestParam Long cartId) {
        List<EntityModel<CartItemResponse>> items = service.searchByCartId(cartId).stream()
                .map(this::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(
                items,
                linkTo(methodOn(CartItemController.class).searchByCart(cartId)).withSelfRel()
        );
    }

    @GetMapping("/search/by-variant")
    public CollectionModel<EntityModel<CartItemResponse>> searchByVariant(@RequestParam Long variantId) {
        List<EntityModel<CartItemResponse>> items = service.searchByVariantId(variantId).stream()
                .map(this::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(
                items,
                linkTo(methodOn(CartItemController.class).searchByVariant(variantId)).withSelfRel()
        );
    }

    // ✅ HATEOAS links
    private EntityModel<CartItemResponse> toModel(CartItemResponse item) {
        return EntityModel.of(
                item,
                linkTo(methodOn(CartItemController.class).getById(item.getId())).withSelfRel(),
                linkTo(methodOn(CartItemController.class).getAll()).withRel("all-cart-items"),
                linkTo(CartItemController.class).slash(item.getId()).withRel("delete-cart-item")
        );
    }
}
