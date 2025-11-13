package com.example.shopdb.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.FirebaseDatabase;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void init() {
        try {
            // Load file serviceAccountKey.json từ resources
            InputStream serviceAccount = getClass().getClassLoader()
                    .getResourceAsStream("firebase/serviceAccountKey.json");

            if (serviceAccount == null) {
                throw new RuntimeException("Không tìm thấy file serviceAccountKey.json trong resources/firebase/");
            }

            // Cấu hình Firebase chỉ với Realtime Database
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://doan-java-d478b-default-rtdb.firebaseio.com") // URL Realtime DB
                    .build();

            // Khởi tạo FirebaseApp nếu chưa có
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }

            // Khởi tạo Realtime Database
            FirebaseDatabase database = FirebaseDatabase.getInstance();
            System.out.println("✅ Firebase Realtime Database initialized: " + database.getReference().toString());

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("❌ Lỗi khởi tạo Firebase: " + e.getMessage());
        }
    }
}
