package com.example.shopdb.service;

import com.example.shopdb.dto.response.ProductResponse;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface ProductService {
    List<ProductResponse> getAll();
    ProductResponse getById(Long id);
    ProductResponse create(String productJson, MultipartFile image) throws Exception;
    ProductResponse update(Long id, String productJson, MultipartFile image) throws Exception;
    void delete(Long id);

    // ✅ Tìm kiếm nâng cao (keyword + giá + danh mục + thương hiệu)
    List<ProductResponse> search(String keyword, Double minPrice, Double maxPrice, Long categoryId, Long brandId);
}
