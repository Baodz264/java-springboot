package com.example.shopdb.service.impl;

import com.example.shopdb.service.FileStorageService;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads";

    @Override
    public String uploadFile(MultipartFile file, String userId) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File rỗng");
        }
        if (userId == null || userId.isEmpty()) {
            throw new IllegalArgumentException("UserId không được để trống");
        }

        // Tạo tên file duy nhất
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        // Tạo thư mục nếu chưa tồn tại
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists() && !uploadDir.mkdirs()) {
            throw new IOException("Không tạo được thư mục lưu file");
        }

        // Lưu file local
        File dest = new File(uploadDir, fileName);
        file.transferTo(dest);

        // URL truy cập file
        String fileUrl = "http://localhost:8080/uploads/" + fileName;

        // Lưu URL vào Firebase Realtime Database
        DatabaseReference ref = FirebaseDatabase.getInstance()
                .getReference("images")
                .child(userId);
        ref.push().setValueAsync(fileUrl);

        return fileUrl;
    }
}
