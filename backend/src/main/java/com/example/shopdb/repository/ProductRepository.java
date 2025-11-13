package com.example.shopdb.repository;

import com.example.shopdb.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // ✅ Tìm theo tên hoặc mã
    List<Product> findByNameContainingIgnoreCaseOrSkuContainingIgnoreCase(String name, String sku);

    // ✅ Tìm theo giá chính xác
    List<Product> findByPrice(Double price);

    // ✅ Tìm theo tên, mã hoặc giá
    List<Product> findByNameContainingIgnoreCaseOrSkuContainingIgnoreCaseOrPrice(
            String name, String sku, Double price
    );

    // ✅ Tìm theo khoảng giá
    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);

    // ✅ Tìm theo giá lớn hơn hoặc bằng
    List<Product> findByPriceGreaterThanEqual(Double minPrice);

    // ✅ Tìm theo giá nhỏ hơn hoặc bằng
    List<Product> findByPriceLessThanEqual(Double maxPrice);

    // ✅ Tìm theo danh mục
    List<Product> findByCategoryId(Long categoryId);

    // ✅ Tìm theo thương hiệu
    List<Product> findByBrandId(Long brandId);

    // ✅ Tìm theo danh mục và thương hiệu
    List<Product> findByCategoryIdAndBrandId(Long categoryId, Long brandId);
}
