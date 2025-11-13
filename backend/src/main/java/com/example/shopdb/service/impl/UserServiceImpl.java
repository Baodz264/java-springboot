package com.example.shopdb.service.impl;

import com.example.shopdb.dto.request.UserRequest;
import com.example.shopdb.dto.response.UserResponse;
import com.example.shopdb.entity.Gender;
import com.example.shopdb.entity.Role;
import com.example.shopdb.entity.User;
import com.example.shopdb.repository.UserRepository;
import com.example.shopdb.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final String UPLOAD_DIR = "uploads/avatars/";

    @Override
    public List<UserResponse> getAll() {
        return repository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse getById(Long id) {
        return repository.findById(id).map(this::toResponse).orElse(null);
    }

    @Override
    public UserResponse create(UserRequest request, MultipartFile avatar) {
        String avatarUrl = saveFile(avatar);

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(request.getPassword())
                .phone(request.getPhone())
                .avatarUrl(avatarUrl)
                .role(toRole(request.getRole()))
                .status(request.getStatus() != null ? request.getStatus() : true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .lastLoginAt(null)
                .gender(toGender(request.getGender()))
                .dateOfBirth(request.getDateOfBirth())
                .build();

        return toResponse(repository.save(user));
    }

    @Override
    public UserResponse update(Long id, UserRequest request, MultipartFile avatar) {
        return repository.findById(id).map(user -> {
            user.setFullName(request.getFullName());
            user.setEmail(request.getEmail());
            user.setPhone(request.getPhone());
            user.setRole(toRole(request.getRole()));
            user.setStatus(request.getStatus() != null ? request.getStatus() : user.getStatus());
            user.setUpdatedAt(LocalDateTime.now());
            user.setGender(toGender(request.getGender()));
            user.setDateOfBirth(request.getDateOfBirth());

            if (avatar != null && !avatar.isEmpty()) {
                deleteFile(user.getAvatarUrl());
                user.setAvatarUrl(saveFile(avatar));
            }

            return toResponse(repository.save(user));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.findById(id).ifPresent(user -> {
            deleteFile(user.getAvatarUrl());
            repository.delete(user);
        });
    }

    @Override
    public String uploadAvatar(MultipartFile avatar) {
        return saveFile(avatar);
    }

    @Override
    public List<UserResponse> search(String keyword) {
        List<User> users = new ArrayList<>();
        users.addAll(repository.findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneContainingIgnoreCase(
                keyword, keyword, keyword
        ));

        try {
            Role role = Role.valueOf(keyword.toUpperCase());
            users.addAll(repository.findAll().stream().filter(u -> u.getRole() == role).toList());
        } catch (Exception ignored) {}

        return users.stream().distinct().map(this::toResponse).collect(Collectors.toList());
    }

    private String saveFile(MultipartFile file) {
        if (file == null || file.isEmpty()) return null;
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR, fileName);
            Files.write(path, file.getBytes());
            return "/uploads/avatars/" + fileName;
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi lưu avatar: " + e.getMessage());
        }
    }

    private void deleteFile(String fileUrl) {
        if (fileUrl == null) return;
        try {
            Path path = Paths.get(fileUrl.replaceFirst("/uploads/avatars/", UPLOAD_DIR));
            Files.deleteIfExists(path);
        } catch (Exception ignored) {}
    }

    private UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .password(user.getPassword())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole() != null ? user.getRole().name() : null)
                .status(user.getStatus())
                .lastLoginAt(user.getLastLoginAt())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .gender(user.getGender() != null ? user.getGender().name() : null)
                .dateOfBirth(user.getDateOfBirth())
                .build();
    }

    private Role toRole(String role) {
        if (role == null || role.isBlank()) return Role.USER;
        return Role.valueOf(role.toUpperCase());
    }

    private Gender toGender(String gender) {
        if (gender == null || gender.isBlank()) return null;
        try {
            return Gender.valueOf(gender.toUpperCase());
        } catch (Exception e) {
            return null;
        }
    }
}
