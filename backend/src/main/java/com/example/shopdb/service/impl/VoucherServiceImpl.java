package com.example.shopdb.service.impl;

import com.example.shopdb.dto.request.VoucherRequest;
import com.example.shopdb.dto.response.VoucherResponse;
import com.example.shopdb.entity.DiscountType;
import com.example.shopdb.entity.Voucher;
import com.example.shopdb.repository.VoucherRepository;
import com.example.shopdb.service.VoucherService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoucherServiceImpl implements VoucherService {

    private final VoucherRepository repository;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    private final String UPLOAD_DIR = "uploads/vouchers/";

    @Override
    public List<VoucherResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public VoucherResponse getById(Long id) {
        return repository.findById(id).map(this::toResponse).orElse(null);
    }

    @Override
    public VoucherResponse create(String voucherJson, MultipartFile image) throws Exception {
        VoucherRequest request = objectMapper.readValue(voucherJson, VoucherRequest.class);
        String imageUrl = saveImage(image);

        Voucher voucher = Voucher.builder()
                .code(request.getCode())
                .discountType(toDiscountType(request.getDiscountType()))
                .discountValue(request.getDiscountValue())
                .minOrderValue(request.getMinOrderValue())
                .usageLimit(request.getUsageLimit())
                .usedCount(request.getUsedCount())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .imageUrl(imageUrl)
                .status(request.getStatus())
                .build();

        return toResponse(repository.save(voucher));
    }

    @Override
    public VoucherResponse update(Long id, String voucherJson, MultipartFile image) throws Exception {
        VoucherRequest request = objectMapper.readValue(voucherJson, VoucherRequest.class);

        return repository.findById(id).map(voucher -> {
            voucher.setCode(request.getCode());
            voucher.setDiscountType(toDiscountType(request.getDiscountType()));
            voucher.setDiscountValue(request.getDiscountValue());
            voucher.setMinOrderValue(request.getMinOrderValue());
            voucher.setUsageLimit(request.getUsageLimit());
            voucher.setUsedCount(request.getUsedCount());
            voucher.setStartDate(request.getStartDate());
            voucher.setEndDate(request.getEndDate());
            voucher.setStatus(request.getStatus());

            if (image != null && !image.isEmpty()) {
                deleteImage(voucher.getImageUrl());
                voucher.setImageUrl(saveImage(image));
            }

            return toResponse(repository.save(voucher));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.findById(id).ifPresent(voucher -> {
            deleteImage(voucher.getImageUrl());
            repository.delete(voucher);
        });
    }

    @Override
    public List<VoucherResponse> search(String keyword) {
        List<Voucher> vouchers;
        if ("true".equalsIgnoreCase(keyword) || "false".equalsIgnoreCase(keyword)) {
            Boolean status = Boolean.parseBoolean(keyword);
            vouchers = repository.findByStatus(status);
        } else {
            vouchers = repository.searchByCodeOrDiscountType(keyword);
        }
        return vouchers.stream().map(this::toResponse).collect(Collectors.toList());
    }

    private String saveImage(MultipartFile file) {
        if (file == null || file.isEmpty()) return null;
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR, fileName);
            Files.write(path, file.getBytes(), StandardOpenOption.CREATE);
            return "/uploads/vouchers/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi lưu ảnh: " + e.getMessage());
        }
    }

    private void deleteImage(String imageUrl) {
        if (imageUrl == null) return;
        try {
            Path path = Paths.get(imageUrl.replaceFirst("/uploads/vouchers/", UPLOAD_DIR));
            Files.deleteIfExists(path);
        } catch (IOException e) {
            // Optional log
        }
    }

    private VoucherResponse toResponse(Voucher voucher) {
        return VoucherResponse.builder()
                .id(voucher.getId())
                .code(voucher.getCode())
                .discountType(voucher.getDiscountType() != null ? voucher.getDiscountType().name() : null)
                .discountValue(voucher.getDiscountValue())
                .minOrderValue(voucher.getMinOrderValue())
                .usageLimit(voucher.getUsageLimit())
                .usedCount(voucher.getUsedCount())
                .startDate(voucher.getStartDate())
                .endDate(voucher.getEndDate())
                .imageUrl(voucher.getImageUrl())
                .status(voucher.getStatus())
                .createdAt(voucher.getCreatedAt())
                .updatedAt(voucher.getUpdatedAt())
                .build();
    }

    private DiscountType toDiscountType(String type) {
        if (type == null) return DiscountType.FIXED;
        return DiscountType.valueOf(type.toUpperCase());
    }
}
