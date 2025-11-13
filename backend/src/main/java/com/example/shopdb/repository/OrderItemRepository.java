package com.example.shopdb.repository;

import com.example.shopdb.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrder_Id(Long orderId);
    List<OrderItem> findByProductVariant_Id(Long productVariantId);
    List<OrderItem> findByOrder_IdAndProductVariant_Id(Long orderId, Long productVariantId);
}
