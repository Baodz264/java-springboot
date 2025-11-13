// src/pages/home/ProductNew.jsx
import React, { useEffect, useState } from "react";
import ProductService from "../../../../services/productService";
import ProductImageService from "../../../../services/productImageService";
import ProductVariantService from "../../../../services/productVariantService";
import ProductCard from "./ProductCard";
import { Wrapper, SectionTitle, ProductGrid } from "./style";

const ProductNew = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ✅ Lấy dữ liệu từ 3 service
        const [productsData, imagesData, variantsData] = await Promise.all([
          ProductService.getAll(),         // luôn trả về array nhờ interceptor
          ProductImageService.getAll(),    // luôn trả về array
          ProductVariantService.getAll(),  // luôn trả về array
        ]);

        // Kiểm tra dữ liệu an toàn
        const safeProducts = Array.isArray(productsData) ? productsData : [];
        const safeImages = Array.isArray(imagesData) ? imagesData : [];
        const safeVariants = Array.isArray(variantsData) ? variantsData : [];

        // Lọc 12 sản phẩm mới nhất
        const newProducts = safeProducts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 12)
          .map((p) => ({
            ...p,
            images: safeImages.filter((img) => img.productId === p.id),
            variants: safeVariants.filter((v) => v.productId === p.id),
          }));

        setProducts(newProducts);
      } catch (err) {
        console.error("Lỗi tải sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <p style={{ textAlign: "center" }}>Đang tải sản phẩm...</p>;

  if (!products.length)
    return <p style={{ textAlign: "center" }}>Không có sản phẩm mới.</p>;

  return (
    <Wrapper>
      <SectionTitle>Sản phẩm mới</SectionTitle>
      <ProductGrid>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </ProductGrid>
    </Wrapper>
  );
};

export default ProductNew;
