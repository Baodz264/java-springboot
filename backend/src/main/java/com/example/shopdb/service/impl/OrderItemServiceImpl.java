package com.example.shopdb.service.impl;

import com.example.shopdb.dto.request.OrderItemRequest;
import com.example.shopdb.dto.response.OrderItemResponse;
import com.example.shopdb.entity.Order;
import com.example.shopdb.entity.OrderItem;
import com.example.shopdb.entity.ProductVariant;
import com.example.shopdb.repository.OrderItemRepository;
import com.example.shopdb.repository.OrderRepository;
import com.example.shopdb.repository.ProductVariantRepository;
import com.example.shopdb.service.OrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {
    private final OrderItemRepository repository;
    private final OrderRepository orderRepository;
    private final ProductVariantRepository variantRepository;

    @Override
    public List<OrderItemResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public OrderItemResponse getById(Long id) {
        return repository.findById(id).map(this::toResponse).orElse(null);
    }

    @Override
    public OrderItemResponse create(OrderItemRequest request) {
        Order order = orderRepository.findById(request.getOrderId()).orElse(null);
        ProductVariant variant = variantRepository.findById(request.getProductVariantId()).orElse(null);
        OrderItem item = OrderItem.builder()
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .order(order)
                .productVariant(variant)
                .build();
        return toResponse(repository.save(item));
    }

    @Override
    public OrderItemResponse update(Long id, OrderItemRequest request) {
        return repository.findById(id).map(item -> {
            Order order = orderRepository.findById(request.getOrderId()).orElse(null);
            ProductVariant variant = variantRepository.findById(request.getProductVariantId()).orElse(null);
            item.setPrice(request.getPrice());
            item.setQuantity(request.getQuantity());
            item.setOrder(order);
            item.setProductVariant(variant);
            return toResponse(repository.save(item));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<OrderItemResponse> search(Long orderId, Long productVariantId) {
        List<OrderItem> items;

        if (orderId != null && productVariantId != null) {
            items = repository.findByOrder_IdAndProductVariant_Id(orderId, productVariantId);
        } else if (orderId != null) {
            items = repository.findByOrder_Id(orderId);
        } else if (productVariantId != null) {
            items = repository.findByProductVariant_Id(productVariantId);
        } else {
            items = repository.findAll();
        }

        return items.stream().map(this::toResponse).collect(Collectors.toList());
    }

    private OrderItemResponse toResponse(OrderItem item) {
        Long orderId = item.getOrder() != null ? item.getOrder().getId() : null;
        Long variantId = item.getProductVariant() != null ? item.getProductVariant().getId() : null;
        return OrderItemResponse.builder()
                .id(item.getId())
                .price(item.getPrice())
                .quantity(item.getQuantity())
                .orderId(orderId)
                .productVariantId(variantId)
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .build();
    }
}
