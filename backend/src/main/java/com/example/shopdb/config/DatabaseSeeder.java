package com.example.shopdb.config;

import com.example.shopdb.entity.*;
import com.example.shopdb.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final BannerRepository bannerRepository;

    @Override
    public void run(String... args) throws Exception {
        seedBrands();
        seedCategories();
        seedProductsAndVariants();
        seedBanners();
    }

    private void seedBrands() {
        if (brandRepository.count() > 0) return;

        Brand nike = Brand.builder().name("Nike").description("Thương hiệu thể thao nổi tiếng").status(true).build();
        Brand adidas = Brand.builder().name("Adidas").description("Thương hiệu thể thao Châu Âu").status(true).build();
        Brand zara = Brand.builder().name("Zara").description("Thời trang cao cấp").status(true).build();
        Brand hm = Brand.builder().name("H&M").description("Thời trang phổ thông").status(true).build();
        brandRepository.saveAll(Arrays.asList(nike, adidas, zara, hm));
    }

    private void seedCategories() {
        if (categoryRepository.count() > 0) return;

        Category ao = Category.builder().name("Áo").build();
        Category aoThun = Category.builder().name("Áo Thun").parent(ao).build();
        Category aoKhoac = Category.builder().name("Áo Khoác").parent(ao).build();
        Category quan = Category.builder().name("Quần").build();
        Category quanShort = Category.builder().name("Quần Short").parent(quan).build();
        Category quanDai = Category.builder().name("Quần Dài").parent(quan).build();

        categoryRepository.saveAll(Arrays.asList(ao, aoThun, aoKhoac, quan, quanShort, quanDai));
    }

    private void seedProductsAndVariants() {
        if (productRepository.count() > 0) return;

        Brand nike = brandRepository.findByNameContainingIgnoreCase("Nike").get(0);
        Brand adidas = brandRepository.findByNameContainingIgnoreCase("Adidas").get(0);
        Brand zara = brandRepository.findByNameContainingIgnoreCase("Zara").get(0);
        Brand hm = brandRepository.findByNameContainingIgnoreCase("H&M").get(0);

        Category aoThun = categoryRepository.findByNameContainingIgnoreCase("Áo Thun").get(0);
        Category aoKhoac = categoryRepository.findByNameContainingIgnoreCase("Áo Khoác").get(0);
        Category quanShort = categoryRepository.findByNameContainingIgnoreCase("Quần Short").get(0);
        Category quanDai = categoryRepository.findByNameContainingIgnoreCase("Quần Dài").get(0);

        List<Product> products = new ArrayList<>();
        int skuCounter = 1;

        // Áo Thun Nike & Adidas (10 sản phẩm)
        for (int i = 1; i <= 5; i++) {
            products.add(Product.builder()
                    .sku("ATN" + skuCounter)
                    .name("Áo Thun Nike " + (i % 2 == 0 ? "Nữ" : "Nam"))
                    .description("Áo thun Nike cotton thoáng mát " + i)
                    .price(200000.0 + i * 10000)
                    .stock(100)
                    .thumbnailUrl("/uploads/products/ao_nike" + i + ".jpg")
                    .status(true)
                    .category(aoThun)
                    .brand(nike)
                    .build());
            skuCounter++;

            products.add(Product.builder()
                    .sku("ATA" + skuCounter)
                    .name("Áo Thun Adidas " + (i % 2 == 0 ? "Nữ" : "Nam"))
                    .description("Áo thun Adidas thể thao " + i)
                    .price(210000.0 + i * 10000)
                    .stock(80)
                    .thumbnailUrl("/uploads/products/ao_adidas" + i + ".jpg")
                    .status(true)
                    .category(aoThun)
                    .brand(adidas)
                    .build());
            skuCounter++;
        }

        // Áo Khoác Zara & H&M (10 sản phẩm)
        for (int i = 1; i <= 5; i++) {
            products.add(Product.builder()
                    .sku("AKZ" + skuCounter)
                    .name("Áo Khoác Zara " + (i % 2 == 0 ? "Nữ" : "Nam"))
                    .description("Áo khoác Zara phong cách " + i)
                    .price(400000.0 + i * 20000)
                    .stock(50)
                    .thumbnailUrl("/uploads/products/ao_zara" + i + ".jpg")
                    .status(true)
                    .category(aoKhoac)
                    .brand(zara)
                    .build());
            skuCounter++;

            products.add(Product.builder()
                    .sku("AKH" + skuCounter)
                    .name("Áo Khoác H&M " + (i % 2 == 0 ? "Nữ" : "Nam"))
                    .description("Áo khoác H&M nỉ " + i)
                    .price(380000.0 + i * 15000)
                    .stock(60)
                    .thumbnailUrl("/uploads/products/ao_hm" + i + ".jpg")
                    .status(true)
                    .category(aoKhoac)
                    .brand(hm)
                    .build());
            skuCounter++;
        }

        // Quần Short Nike & Quần Dài Adidas/Zara/H&M (20 sản phẩm)
        for (int i = 1; i <= 5; i++) {
            products.add(Product.builder()
                    .sku("QSN" + skuCounter)
                    .name("Quần Short Nike " + i)
                    .description("Quần short thể thao Nike " + i)
                    .price(200000.0 + i * 10000)
                    .stock(70)
                    .thumbnailUrl("/uploads/products/quan_nike" + i + ".jpg")
                    .status(true)
                    .category(quanShort)
                    .brand(nike)
                    .build());
            skuCounter++;

            products.add(Product.builder()
                    .sku("QDA" + skuCounter)
                    .name("Quần Dài Adidas " + i)
                    .description("Quần dài thể thao Adidas " + i)
                    .price(300000.0 + i * 15000)
                    .stock(60)
                    .thumbnailUrl("/uploads/products/quan_adidas" + i + ".jpg")
                    .status(true)
                    .category(quanDai)
                    .brand(adidas)
                    .build());
            skuCounter++;

            products.add(Product.builder()
                    .sku("QDZ" + skuCounter)
                    .name("Quần Dài Zara " + i)
                    .description("Quần jean Zara " + i)
                    .price(350000.0 + i * 15000)
                    .stock(50)
                    .thumbnailUrl("/uploads/products/quan_zara" + i + ".jpg")
                    .status(true)
                    .category(quanDai)
                    .brand(zara)
                    .build());
            skuCounter++;

            products.add(Product.builder()
                    .sku("QDH" + skuCounter)
                    .name("Quần Dài H&M " + i)
                    .description("Quần dài H&M nữ " + i)
                    .price(320000.0 + i * 12000)
                    .stock(40)
                    .thumbnailUrl("/uploads/products/quan_hm" + i + ".jpg")
                    .status(true)
                    .category(quanDai)
                    .brand(hm)
                    .build());
            skuCounter++;
        }

        productRepository.saveAll(products);

        // Tạo variant cho từng sản phẩm (S, M, L)
        for (Product p : products) {
            ProductVariant vS = ProductVariant.builder().size("S").color("Trắng").extraPrice(0.0).stock(20)
                    .imageUrl("/uploads/product-variants/" + p.getSku() + "_S_white.jpg").product(p).build();
            ProductVariant vM = ProductVariant.builder().size("M").color("Đen").extraPrice(0.0).stock(20)
                    .imageUrl("/uploads/product-variants/" + p.getSku() + "_M_black.jpg").product(p).build();
            ProductVariant vL = ProductVariant.builder().size("L").color("Xanh").extraPrice(0.0).stock(20)
                    .imageUrl("/uploads/product-variants/" + p.getSku() + "_L_blue.jpg").product(p).build();
            productVariantRepository.saveAll(Arrays.asList(vS, vM, vL));
        }
    }

    private void seedBanners() {
        if (bannerRepository.count() > 0) return;

        List<Banner> banners = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            banners.add(Banner.builder()
                    .title("Banner Sale " + i)
                    .imageUrl("/uploads/banners/banner" + i + ".jpg")
                    .link("/sale/" + i)
                    .startDate(LocalDate.now().minusDays(5))
                    .endDate(LocalDate.now().plusDays(30))
                    .status(true)
                    .build());
        }

        bannerRepository.saveAll(banners);
    }
}
