package com.example.shopdb.controller;

import com.example.shopdb.dto.request.OrderItemRequest;
import com.example.shopdb.dto.response.OrderItemResponse;
import com.example.shopdb.service.OrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/order-items")
@RequiredArgsConstructor
public class OrderItemController {
    private final OrderItemService service;

    @GetMapping
    public CollectionModel<EntityModel<OrderItemResponse>> getAll() {
        List<EntityModel<OrderItemResponse>> items = service.getAll()
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                items,
                linkTo(methodOn(OrderItemController.class).getAll()).withSelfRel()
        );
    }

    @GetMapping("/{id}")
    public EntityModel<OrderItemResponse> getById(@PathVariable Long id) {
        OrderItemResponse item = service.getById(id);
        return toModel(item);
    }

    @PostMapping
    public EntityModel<OrderItemResponse> create(@RequestBody OrderItemRequest request) {
        OrderItemResponse item = service.create(request);
        return toModel(item);
    }

    @PutMapping("/{id}")
    public EntityModel<OrderItemResponse> update(@PathVariable Long id, @RequestBody OrderItemRequest request) {
        OrderItemResponse item = service.update(id, request);
        return toModel(item);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/search")
    public CollectionModel<EntityModel<OrderItemResponse>> search(
            @RequestParam(required = false) Long orderId,
            @RequestParam(required = false) Long productVariantId
    ) {
        List<EntityModel<OrderItemResponse>> items = service.search(orderId, productVariantId)
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                items,
                linkTo(methodOn(OrderItemController.class).search(orderId, productVariantId)).withSelfRel()
        );
    }

    // ✅ HATEOAS helper
    private EntityModel<OrderItemResponse> toModel(OrderItemResponse item) {
        return EntityModel.of(
                item,
                linkTo(methodOn(OrderItemController.class).getById(item.getId())).withSelfRel(),
                linkTo(methodOn(OrderItemController.class).getAll()).withRel("all-order-items"),
                linkTo(OrderItemController.class).slash(item.getId()).withRel("delete-order-item")
        );
    }
}
