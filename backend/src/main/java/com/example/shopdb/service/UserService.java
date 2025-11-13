package com.example.shopdb.service;

import com.example.shopdb.dto.request.UserRequest;
import com.example.shopdb.dto.response.UserResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    List<UserResponse> getAll();
    UserResponse getById(Long id);
    UserResponse create(UserRequest request, MultipartFile avatar);
    UserResponse update(Long id, UserRequest request, MultipartFile avatar);
    void delete(Long id);

    // Upload avatar độc lập
    String uploadAvatar(MultipartFile avatar);

    // ✅ Search
    List<UserResponse> search(String keyword);
}
