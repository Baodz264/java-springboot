package com.example.shopdb.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                // ✅ Cho phép Spring Boot phục vụ ảnh cả trong và ngoài thư mục backend
                .addResourceLocations(
                        "file:./uploads/",   // khi thư mục uploads nằm cùng cấp backend
                        "file:backend/uploads/" // dự phòng nếu có ảnh nằm trong backend/uploads
                )
                .setCachePeriod(3600);
    }
}
