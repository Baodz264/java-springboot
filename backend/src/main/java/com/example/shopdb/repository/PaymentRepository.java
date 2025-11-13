package com.example.shopdb.repository;

import com.example.shopdb.entity.Payment;
import com.example.shopdb.entity.PaymentProvider;
import com.example.shopdb.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByTransactionCodeContainingIgnoreCase(String keyword);

    List<Payment> findByProvider(PaymentProvider provider);

    List<Payment> findByStatus(PaymentStatus status);

    List<Payment> findByAmountBetween(Double min, Double max);
}
