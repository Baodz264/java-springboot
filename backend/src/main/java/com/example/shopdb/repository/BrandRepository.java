package com.example.shopdb.repository;

import com.example.shopdb.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BrandRepository extends JpaRepository<Brand, Long> {
    // ✅ search theo tên thương hiệu (ignore case)
    List<Brand> findByNameContainingIgnoreCase(String keyword);
}
