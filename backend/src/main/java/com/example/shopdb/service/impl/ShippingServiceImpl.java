package com.example.shopdb.service.impl;

import com.example.shopdb.dto.request.ShippingRequest;
import com.example.shopdb.dto.response.ShippingResponse;
import com.example.shopdb.entity.Order;
import com.example.shopdb.entity.Shipping;
import com.example.shopdb.entity.ShippingStatus;
import com.example.shopdb.repository.OrderRepository;
import com.example.shopdb.repository.ShippingRepository;
import com.example.shopdb.service.ShippingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShippingServiceImpl implements ShippingService {
    private final ShippingRepository repository;
    private final OrderRepository orderRepository;

    @Override
    public List<ShippingResponse> getAll() {
        return repository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ShippingResponse getById(Long id) {
        return repository.findById(id).map(this::toResponse).orElse(null);
    }

    @Override
    public ShippingResponse create(ShippingRequest request) {
        Order order = orderRepository.findById(request.getOrderId()).orElse(null);

        Shipping shipping = Shipping.builder()
                .shippingAddress(request.getShippingAddress())
                .shippingProvider(request.getShippingProvider())
                .trackingNumber(request.getTrackingNumber())
                .shippingFee(request.getShippingFee())
                .status(toStatus(request.getStatus()))
                .estimatedDelivery(request.getEstimatedDelivery())
                .deliveredAt(request.getDeliveredAt())
                .order(order)
                .build();

        return toResponse(repository.save(shipping));
    }

    @Override
    public ShippingResponse update(Long id, ShippingRequest request) {
        return repository.findById(id).map(shipping -> {
            Order order = orderRepository.findById(request.getOrderId()).orElse(null);
            shipping.setShippingAddress(request.getShippingAddress());
            shipping.setShippingProvider(request.getShippingProvider());
            shipping.setTrackingNumber(request.getTrackingNumber());
            shipping.setShippingFee(request.getShippingFee());
            shipping.setStatus(toStatus(request.getStatus()));
            shipping.setEstimatedDelivery(request.getEstimatedDelivery());
            shipping.setDeliveredAt(request.getDeliveredAt());
            shipping.setOrder(order);
            return toResponse(repository.save(shipping));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    // ✅ Search function
    @Override
    public List<ShippingResponse> search(String keyword) {
        ShippingStatus status = null;
        try {
            status = ShippingStatus.valueOf(keyword.toUpperCase());
        } catch (Exception ignored) {}

        return repository.findByShippingAddressContainingIgnoreCaseOrShippingProviderContainingIgnoreCaseOrTrackingNumberContainingIgnoreCaseOrStatus(
                keyword, keyword, keyword, status
        ).stream().map(this::toResponse).collect(Collectors.toList());
    }

    private ShippingResponse toResponse(Shipping shipping) {
        Long orderId = shipping.getOrder() != null ? shipping.getOrder().getId() : null;

        return ShippingResponse.builder()
                .id(shipping.getId())
                .shippingAddress(shipping.getShippingAddress())
                .shippingProvider(shipping.getShippingProvider())
                .trackingNumber(shipping.getTrackingNumber())
                .shippingFee(shipping.getShippingFee())
                .status(shipping.getStatus().name())
                .estimatedDelivery(shipping.getEstimatedDelivery())
                .deliveredAt(shipping.getDeliveredAt())
                .orderId(orderId)
                .createdAt(shipping.getCreatedAt())
                .updatedAt(shipping.getUpdatedAt())
                .build();
    }

    private ShippingStatus toStatus(String status) {
        if (status == null) return ShippingStatus.PENDING;
        return ShippingStatus.valueOf(status.toUpperCase());
    }
}
