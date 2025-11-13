package com.example.shopdb.service.impl;

import com.example.shopdb.dto.request.PaymentRequest;
import com.example.shopdb.dto.response.PaymentResponse;
import com.example.shopdb.entity.Order;
import com.example.shopdb.entity.Payment;
import com.example.shopdb.entity.PaymentProvider;
import com.example.shopdb.entity.PaymentStatus;
import com.example.shopdb.repository.OrderRepository;
import com.example.shopdb.repository.PaymentRepository;
import com.example.shopdb.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository repository;
    private final OrderRepository orderRepository;

    @Override
    public List<PaymentResponse> getAll() {
        return repository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PaymentResponse getById(Long id) {
        return repository.findById(id).map(this::toResponse).orElse(null);
    }

    @Override
    public PaymentResponse create(PaymentRequest request) {
        Order order = orderRepository.findById(request.getOrderId()).orElse(null);

        Payment payment = Payment.builder()
                .amount(request.getAmount())
                .provider(toProvider(request.getProvider()))
                .status(toStatus(request.getStatus()))
                .transactionCode(request.getTransactionCode())
                .order(order)
                .build();

        return toResponse(repository.save(payment));
    }

    @Override
    public PaymentResponse update(Long id, PaymentRequest request) {
        return repository.findById(id).map(payment -> {
            Order order = orderRepository.findById(request.getOrderId()).orElse(null);
            payment.setAmount(request.getAmount());
            payment.setProvider(toProvider(request.getProvider()));
            payment.setStatus(toStatus(request.getStatus()));
            payment.setTransactionCode(request.getTransactionCode());
            payment.setOrder(order);
            return toResponse(repository.save(payment));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<PaymentResponse> search(String keyword, String provider, String status, Double minAmount, Double maxAmount) {
        List<Payment> payments = repository.findAll();

        return payments.stream()
                .filter(p -> keyword == null || p.getTransactionCode().toLowerCase().contains(keyword.toLowerCase()))
                .filter(p -> provider == null || p.getProvider().name().equalsIgnoreCase(provider))
                .filter(p -> status == null || p.getStatus().name().equalsIgnoreCase(status))
                .filter(p -> (minAmount == null || p.getAmount() >= minAmount) &&
                             (maxAmount == null || p.getAmount() <= maxAmount))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private PaymentResponse toResponse(Payment payment) {
        Long orderId = payment.getOrder() != null ? payment.getOrder().getId() : null;
        return PaymentResponse.builder()
                .id(payment.getId())
                .amount(payment.getAmount())
                .provider(payment.getProvider().name()) // enum -> String
                .status(payment.getStatus().name())     // enum -> String
                .transactionCode(payment.getTransactionCode())
                .orderId(orderId)
                .createdAt(payment.getCreatedAt())
                .updatedAt(payment.getUpdatedAt())
                .build();
    }

    // Chuyển String -> Enum
    private PaymentProvider toProvider(String provider) {
        if (provider == null) return PaymentProvider.COD; // default
        return PaymentProvider.valueOf(provider.toUpperCase());
    }

    private PaymentStatus toStatus(String status) {
        if (status == null) return PaymentStatus.PENDING; // default
        return PaymentStatus.valueOf(status.toUpperCase());
    }
}
