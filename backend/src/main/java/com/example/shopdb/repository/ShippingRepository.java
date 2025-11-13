package com.example.shopdb.repository;

import com.example.shopdb.entity.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShippingRepository extends JpaRepository<Shipping, Long> {
    // Tìm kiếm theo shippingAddress, shippingProvider, trackingNumber hoặc status
    List<Shipping> findByShippingAddressContainingIgnoreCaseOrShippingProviderContainingIgnoreCaseOrTrackingNumberContainingIgnoreCaseOrStatus(
            String address, String provider, String tracking, com.example.shopdb.entity.ShippingStatus status
    );
}
