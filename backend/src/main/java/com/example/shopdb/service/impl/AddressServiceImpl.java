package com.example.shopdb.service.impl;

import com.example.shopdb.dto.request.AddressRequest;
import com.example.shopdb.dto.response.AddressResponse;
import com.example.shopdb.entity.Address;
import com.example.shopdb.entity.User;
import com.example.shopdb.repository.AddressRepository;
import com.example.shopdb.repository.UserRepository;
import com.example.shopdb.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressRepository repository;
    private final UserRepository userRepository;

    @Override
    public List<AddressResponse> getAll() {
        return repository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public AddressResponse getById(Long id) {
        return repository.findById(id).map(this::toResponse).orElse(null);
    }

    @Override
    public AddressResponse create(AddressRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow();
        Address address = Address.builder()
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .addressLine(request.getAddressLine())
                .city(request.getCity())
                .district(request.getDistrict())
                .ward(request.getWard())
                .isDefault(request.getIsDefault())
                .user(user)
                .build();
        return toResponse(repository.save(address));
    }

    @Override
    public AddressResponse update(Long id, AddressRequest request) {
        return repository.findById(id).map(address -> {
            address.setFullName(request.getFullName());
            address.setPhone(request.getPhone());
            address.setAddressLine(request.getAddressLine());
            address.setCity(request.getCity());
            address.setDistrict(request.getDistrict());
            address.setWard(request.getWard());
            address.setIsDefault(request.getIsDefault());
            return toResponse(repository.save(address));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<AddressResponse> search(String keyword) {
        return repository
                .findByFullNameContainingIgnoreCaseOrPhoneContainingIgnoreCaseOrAddressLineContainingIgnoreCase(
                        keyword, keyword, keyword
                )
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private AddressResponse toResponse(Address address) {
        return AddressResponse.builder()
                .id(address.getId())
                .fullName(address.getFullName())
                .phone(address.getPhone())
                .addressLine(address.getAddressLine())
                .city(address.getCity())
                .district(address.getDistrict())
                .ward(address.getWard())
                .isDefault(address.getIsDefault())
                .userId(address.getUser().getId())
                .createdAt(address.getCreatedAt())
                .updatedAt(address.getUpdatedAt())
                .build();
    }
}
