package com.example.shopdb.controller;

import com.example.shopdb.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file,
                                    @RequestParam("userId") String userId) {
        try {
            String imageUrl = fileStorageService.uploadFile(file, userId);
            return ResponseEntity.ok().body(
                    new UploadResponse(true, "Upload thành công", imageUrl)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(
                    new UploadResponse(false, "Lỗi upload: " + e.getMessage(), null)
            );
        }
    }

    // Class trả JSON
    public static class UploadResponse {
        private boolean success;
        private String message;
        private String url;

        public UploadResponse(boolean success, String message, String url) {
            this.success = success;
            this.message = message;
            this.url = url;
        }

        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public String getUrl() { return url; }

        public void setSuccess(boolean success) { this.success = success; }
        public void setMessage(String message) { this.message = message; }
        public void setUrl(String url) { this.url = url; }
    }
}
