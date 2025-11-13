package com.example.shopdb.controller;

import com.example.shopdb.dto.request.CartRequest;
import com.example.shopdb.dto.response.CartResponse;
import com.example.shopdb.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService service;

    @GetMapping
    public CollectionModel<EntityModel<CartResponse>> getAll() {
        List<EntityModel<CartResponse>> carts = service.getAll().stream()
                .map(this::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(
                carts,
                linkTo(methodOn(CartController.class).getAll()).withSelfRel()
        );
    }

    @GetMapping("/{id}")
    public EntityModel<CartResponse> getById(@PathVariable Long id) {
        CartResponse cart = service.getById(id);
        return toModel(cart);
    }

    @PostMapping
    public EntityModel<CartResponse> create(@RequestBody CartRequest request) {
        CartResponse cart = service.create(request);
        return toModel(cart);
    }

    @PutMapping("/{id}")
    public EntityModel<CartResponse> update(@PathVariable Long id, @RequestBody CartRequest request) {
        CartResponse cart = service.update(id, request);
        return toModel(cart);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/search")
    public CollectionModel<EntityModel<CartResponse>> search(@RequestParam Long userId) {
        List<EntityModel<CartResponse>> carts = service.searchByUserId(userId).stream()
                .map(this::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(
                carts,
                linkTo(methodOn(CartController.class).search(userId)).withSelfRel()
        );
    }

    // ✅ HATEOAS
    private EntityModel<CartResponse> toModel(CartResponse cart) {
        return EntityModel.of(
                cart,
                linkTo(methodOn(CartController.class).getById(cart.getId())).withSelfRel(),
                linkTo(methodOn(CartController.class).getAll()).withRel("all-carts"),
                linkTo(CartController.class).slash(cart.getId()).withRel("delete-cart")
        );
    }
}
