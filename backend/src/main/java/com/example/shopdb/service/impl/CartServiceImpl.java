package com.example.shopdb.service.impl;

import com.example.shopdb.dto.request.CartRequest;
import com.example.shopdb.dto.response.CartResponse;
import com.example.shopdb.entity.Cart;
import com.example.shopdb.entity.User;
import com.example.shopdb.repository.CartRepository;
import com.example.shopdb.repository.UserRepository;
import com.example.shopdb.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository repository;
    private final UserRepository userRepository;

    @Override
    public List<CartResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public CartResponse getById(Long id) {
        return repository.findById(id).map(this::toResponse).orElse(null);
    }

    @Override
    public CartResponse create(CartRequest request) {
        User user = userRepository.findById(request.getUserId()).orElse(null);
        Cart cart = Cart.builder()
                .user(user)
                .build();
        return toResponse(repository.save(cart));
    }

    @Override
    public CartResponse update(Long id, CartRequest request) {
        return repository.findById(id).map(cart -> {
            User user = userRepository.findById(request.getUserId()).orElse(null);
            cart.setUser(user);
            return toResponse(repository.save(cart));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<CartResponse> searchByUserId(Long userId) {
        return repository.findByUserId(userId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private CartResponse toResponse(Cart cart) {
        Long userId = cart.getUser() != null ? cart.getUser().getId() : null;
        return CartResponse.builder()
                .id(cart.getId())
                .userId(userId)
                .createdAt(cart.getCreatedAt())
                .updatedAt(cart.getUpdatedAt())
                .build();
    }
}
