package com.example.shopdb.service;

import com.example.shopdb.dto.request.AddressRequest;
import com.example.shopdb.dto.response.AddressResponse;

import java.util.List;

public interface AddressService {
    List<AddressResponse> getAll();
    AddressResponse getById(Long id);
    AddressResponse create(AddressRequest request);
    AddressResponse update(Long id, AddressRequest request);
    void delete(Long id);

    // 🔎 search
    List<AddressResponse> search(String keyword);
}
