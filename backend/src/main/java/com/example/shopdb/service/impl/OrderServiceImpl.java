package com.example.shopdb.service.impl;

import com.example.shopdb.dto.request.OrderRequest;
import com.example.shopdb.dto.response.OrderResponse;
import com.example.shopdb.entity.Order;
import com.example.shopdb.entity.OrderStatus;
import com.example.shopdb.entity.PaymentMethod;
import com.example.shopdb.entity.User;
import com.example.shopdb.repository.OrderRepository;
import com.example.shopdb.repository.UserRepository;
import com.example.shopdb.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository repository;
    private final UserRepository userRepository;

    @Override
    public List<OrderResponse> getAll() {
        return repository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse getById(Long id) {
        return repository.findById(id)
                .map(this::toResponse)
                .orElse(null);
    }

    @Override
    public OrderResponse create(OrderRequest request) {
        User user = userRepository.findById(request.getUserId()).orElse(null);

        Order order = Order.builder()
                .totalPrice(request.getTotalPrice())
                .status(toOrderStatus(request.getStatus()))
                .paymentMethod(toPaymentMethod(request.getPaymentMethod()))
                .shippingAddress(request.getShippingAddress())
                .voucherCode(request.getVoucherCode())
                .user(user)
                .build();

        return toResponse(repository.save(order));
    }

    @Override
    public OrderResponse update(Long id, OrderRequest request) {
        return repository.findById(id).map(order -> {
            User user = userRepository.findById(request.getUserId()).orElse(null);
            order.setTotalPrice(request.getTotalPrice());
            order.setStatus(toOrderStatus(request.getStatus()));
            order.setPaymentMethod(toPaymentMethod(request.getPaymentMethod()));
            order.setShippingAddress(request.getShippingAddress());
            order.setVoucherCode(request.getVoucherCode());
            order.setUser(user);
            return toResponse(repository.save(order));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<OrderResponse> search(String status, String paymentMethod, Long userId, String address) {
        Specification<Order> spec = Specification.where(null);

        if (status != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("status"), toOrderStatus(status)));
        }
        if (paymentMethod != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("paymentMethod"), toPaymentMethod(paymentMethod)));
        }
        if (userId != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("user").get("id"), userId));
        }
        if (address != null) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("shippingAddress")), "%" + address.toLowerCase() + "%"));
        }

        return repository.findAll(spec)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private OrderResponse toResponse(Order order) {
        Long userId = order.getUser() != null ? order.getUser().getId() : null;
        return OrderResponse.builder()
                .id(order.getId())
                .totalPrice(order.getTotalPrice())
                .status(order.getStatus().name())
                .paymentMethod(order.getPaymentMethod().name())
                .shippingAddress(order.getShippingAddress())
                .voucherCode(order.getVoucherCode())
                .userId(userId)
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }

    private OrderStatus toOrderStatus(String status) {
        if (status == null) return OrderStatus.PENDING;
        return OrderStatus.valueOf(status.toUpperCase());
    }

    private PaymentMethod toPaymentMethod(String method) {
        if (method == null) return PaymentMethod.COD;
        return PaymentMethod.valueOf(method.toUpperCase());
    }
}
