package com.example.shopdb.service.impl;

import com.example.shopdb.dto.request.CartItemRequest;
import com.example.shopdb.dto.response.CartItemResponse;
import com.example.shopdb.entity.Cart;
import com.example.shopdb.entity.CartItem;
import com.example.shopdb.entity.ProductVariant;
import com.example.shopdb.repository.CartItemRepository;
import com.example.shopdb.repository.CartRepository;
import com.example.shopdb.repository.ProductVariantRepository;
import com.example.shopdb.service.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {
    private final CartItemRepository repository;
    private final CartRepository cartRepository;
    private final ProductVariantRepository variantRepository;

    @Override
    public List<CartItemResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public CartItemResponse getById(Long id) {
        return repository.findById(id).map(this::toResponse).orElse(null);
    }

    @Override
    public CartItemResponse create(CartItemRequest request) {
        Cart cart = cartRepository.findById(request.getCartId()).orElse(null);
        ProductVariant variant = variantRepository.findById(request.getProductVariantId()).orElse(null);
        CartItem item = CartItem.builder()
                .quantity(request.getQuantity())
                .cart(cart)
                .productVariant(variant)
                .build();
        return toResponse(repository.save(item));
    }

    @Override
    public CartItemResponse update(Long id, CartItemRequest request) {
        return repository.findById(id).map(item -> {
            Cart cart = cartRepository.findById(request.getCartId()).orElse(null);
            ProductVariant variant = variantRepository.findById(request.getProductVariantId()).orElse(null);
            item.setQuantity(request.getQuantity());
            item.setCart(cart);
            item.setProductVariant(variant);
            return toResponse(repository.save(item));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    // ✅ Search
    @Override
    public List<CartItemResponse> searchByCartId(Long cartId) {
        return repository.findByCartId(cartId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<CartItemResponse> searchByVariantId(Long productVariantId) {
        return repository.findByProductVariantId(productVariantId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private CartItemResponse toResponse(CartItem item) {
        Long cartId = item.getCart() != null ? item.getCart().getId() : null;
        Long variantId = item.getProductVariant() != null ? item.getProductVariant().getId() : null;
        return CartItemResponse.builder()
                .id(item.getId())
                .quantity(item.getQuantity())
                .cartId(cartId)
                .productVariantId(variantId)
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .build();
    }
}
