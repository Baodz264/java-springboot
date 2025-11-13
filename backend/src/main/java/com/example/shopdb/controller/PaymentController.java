package com.example.shopdb.controller;

import com.example.shopdb.dto.request.PaymentRequest;
import com.example.shopdb.dto.response.PaymentResponse;
import com.example.shopdb.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService service;

    @GetMapping
    public CollectionModel<EntityModel<PaymentResponse>> getAll() {
        List<EntityModel<PaymentResponse>> payments = service.getAll()
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                payments,
                linkTo(methodOn(PaymentController.class).getAll()).withSelfRel()
        );
    }

    @GetMapping("/{id}")
    public EntityModel<PaymentResponse> getById(@PathVariable Long id) {
        PaymentResponse payment = service.getById(id);
        return toModel(payment);
    }

    @PostMapping
    public EntityModel<PaymentResponse> create(@RequestBody PaymentRequest request) {
        PaymentResponse payment = service.create(request);
        return toModel(payment);
    }

    @PutMapping("/{id}")
    public EntityModel<PaymentResponse> update(@PathVariable Long id, @RequestBody PaymentRequest request) {
        PaymentResponse payment = service.update(id, request);
        return toModel(payment);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/search")
    public CollectionModel<EntityModel<PaymentResponse>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String provider,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Double minAmount,
            @RequestParam(required = false) Double maxAmount
    ) {
        List<EntityModel<PaymentResponse>> payments = service.search(keyword, provider, status, minAmount, maxAmount)
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                payments,
                linkTo(methodOn(PaymentController.class).search(keyword, provider, status, minAmount, maxAmount)).withSelfRel()
        );
    }

    // ✅ HATEOAS helper
    private EntityModel<PaymentResponse> toModel(PaymentResponse payment) {
        return EntityModel.of(
                payment,
                linkTo(methodOn(PaymentController.class).getById(payment.getId())).withSelfRel(),
                linkTo(methodOn(PaymentController.class).getAll()).withRel("all-payments"),
                linkTo(PaymentController.class).slash(payment.getId()).withRel("delete-payment")
        );
    }
}
