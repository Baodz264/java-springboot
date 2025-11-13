package com.example.shopdb.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dwoqfjust",
                "api_key", "831821566961264",
                "api_secret", "TLT_fpzpXiLbb3d62iZ-0SnD5hI",
                "secure", true
        ));
    }
}
