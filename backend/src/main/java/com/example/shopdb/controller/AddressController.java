package com.example.shopdb.controller;

import com.example.shopdb.dto.request.AddressRequest;
import com.example.shopdb.dto.response.AddressResponse;
import com.example.shopdb.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.CollectionModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService service;

    @GetMapping
    public CollectionModel<EntityModel<AddressResponse>> getAll() {
        List<EntityModel<AddressResponse>> addresses = service.getAll().stream()
                .map(this::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(
                addresses,
                linkTo(methodOn(AddressController.class).getAll()).withSelfRel()
        );
    }

    @GetMapping("/{id}")
    public EntityModel<AddressResponse> getById(@PathVariable Long id) {
        AddressResponse address = service.getById(id);
        return toModel(address);
    }

    @GetMapping("/search")
    public CollectionModel<EntityModel<AddressResponse>> search(@RequestParam String keyword) {
        List<EntityModel<AddressResponse>> addresses = service.search(keyword).stream()
                .map(this::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(
                addresses,
                linkTo(methodOn(AddressController.class).search(keyword)).withSelfRel()
        );
    }

    @PostMapping
    public EntityModel<AddressResponse> create(@RequestBody AddressRequest request) {
        AddressResponse address = service.create(request);
        return toModel(address);
    }

    @PutMapping("/{id}")
    public EntityModel<AddressResponse> update(@PathVariable Long id, @RequestBody AddressRequest request) {
        AddressResponse address = service.update(id, request);
        return toModel(address);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // ✅ HATEOAS
    private EntityModel<AddressResponse> toModel(AddressResponse address) {
        return EntityModel.of(
                address,
                linkTo(methodOn(AddressController.class).getById(address.getId())).withSelfRel(),
                linkTo(methodOn(AddressController.class).getAll()).withRel("all-addresses"),
                linkTo(AddressController.class).slash(address.getId()).withRel("delete-address")
        );
    }
}
