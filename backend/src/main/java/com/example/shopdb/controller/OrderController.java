package com.example.shopdb.controller;

import com.example.shopdb.dto.request.OrderRequest;
import com.example.shopdb.dto.response.OrderResponse;
import com.example.shopdb.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService service;

    @GetMapping
    public CollectionModel<EntityModel<OrderResponse>> getAll() {
        List<EntityModel<OrderResponse>> orders = service.getAll()
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                orders,
                linkTo(methodOn(OrderController.class).getAll()).withSelfRel()
        );
    }

    @GetMapping("/{id}")
    public EntityModel<OrderResponse> getById(@PathVariable Long id) {
        OrderResponse order = service.getById(id);
        return toModel(order);
    }

    @PostMapping
    public EntityModel<OrderResponse> create(@RequestBody OrderRequest request) {
        OrderResponse order = service.create(request);
        return toModel(order);
    }

    @PutMapping("/{id}")
    public EntityModel<OrderResponse> update(@PathVariable Long id, @RequestBody OrderRequest request) {
        OrderResponse order = service.update(id, request);
        return toModel(order);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/search")
    public CollectionModel<EntityModel<OrderResponse>> search(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String paymentMethod,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String address
    ) {
        List<EntityModel<OrderResponse>> orders = service.search(status, paymentMethod, userId, address)
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                orders,
                linkTo(methodOn(OrderController.class).search(status, paymentMethod, userId, address)).withSelfRel()
        );
    }

    // ✅ HATEOAS helper
    private EntityModel<OrderResponse> toModel(OrderResponse order) {
        return EntityModel.of(
                order,
                linkTo(methodOn(OrderController.class).getById(order.getId())).withSelfRel(),
                linkTo(methodOn(OrderController.class).getAll()).withRel("all-orders"),
                linkTo(OrderController.class).slash(order.getId()).withRel("delete-order")
        );
    }
}
