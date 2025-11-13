package com.example.shopdb.repository;

import com.example.shopdb.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    // ✅ tìm kiếm theo tên (không phân biệt hoa thường)
    List<Category> findByNameContainingIgnoreCase(String keyword);
}
