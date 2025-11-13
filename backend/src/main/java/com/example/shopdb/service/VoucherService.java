package com.example.shopdb.service;

import com.example.shopdb.dto.response.VoucherResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VoucherService {
    List<VoucherResponse> getAll();
    VoucherResponse getById(Long id);
    VoucherResponse create(String voucherJson, MultipartFile image) throws Exception;
    VoucherResponse update(Long id, String voucherJson, MultipartFile image) throws Exception;
    void delete(Long id);

    // ✅ Search
    List<VoucherResponse> search(String keyword);
}
