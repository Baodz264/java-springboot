package com.example.shopdb.controller;

import com.example.shopdb.dto.request.UserRequest;
import com.example.shopdb.dto.response.UserResponse;
import com.example.shopdb.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    @GetMapping
    public CollectionModel<EntityModel<UserResponse>> getAll() {
        List<EntityModel<UserResponse>> users = service.getAll()
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                users,
                linkTo(methodOn(UserController.class).getAll()).withSelfRel()
        );
    }

    @GetMapping("/{id}")
    public EntityModel<UserResponse> getById(@PathVariable Long id) {
        return toModel(service.getById(id));
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public EntityModel<UserResponse> create(@RequestPart("user") String userJson,
                                            @RequestPart(value = "avatar", required = false) MultipartFile avatar) throws Exception {
        UserRequest request = objectMapper.readValue(userJson, UserRequest.class);
        return toModel(service.create(request, avatar));
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public EntityModel<UserResponse> update(@PathVariable Long id,
                                            @RequestPart("user") String userJson,
                                            @RequestPart(value = "avatar", required = false) MultipartFile avatar) throws Exception {
        UserRequest request = objectMapper.readValue(userJson, UserRequest.class);
        return toModel(service.update(id, request, avatar));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PostMapping(value = "/upload-avatar", consumes = {"multipart/form-data"})
    public String uploadAvatar(@RequestPart("avatar") MultipartFile avatar) {
        return service.uploadAvatar(avatar);
    }

    @GetMapping("/search")
    public CollectionModel<EntityModel<UserResponse>> search(@RequestParam String keyword) {
        List<EntityModel<UserResponse>> users = service.search(keyword)
                .stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(
                users,
                linkTo(methodOn(UserController.class).search(keyword)).withSelfRel()
        );
    }

    // ✅ HATEOAS helper
    private EntityModel<UserResponse> toModel(UserResponse user) {
        return EntityModel.of(
                user,
                linkTo(methodOn(UserController.class).getById(user.getId())).withSelfRel(),
                linkTo(methodOn(UserController.class).getAll()).withRel("all-users"),
                linkTo(UserController.class).slash(user.getId()).withRel("delete-user")
        );
    }
}
