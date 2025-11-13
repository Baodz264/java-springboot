package com.example.shopdb.repository;

import com.example.shopdb.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByFullNameContainingIgnoreCaseOrPhoneContainingIgnoreCaseOrAddressLineContainingIgnoreCase(
            String fullName, String phone, String addressLine
    );
}
