import React, { useState, useEffect, useCallback } from "react";
import { Container, MainContent, Header } from "./style";
import ProductService from "../../../../services/productService";
import BrandService from "../../../../services/brandService";
import CategoryService from "../../../../services/categoryService";
import ReviewService from "../../../../services/reviewService";
import { useToast } from "../../../../contexts/ToastProvider";
import { useNavigate } from "react-router-dom";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    rating: "",
    category: "",
    brand: "",
  });
  const [loading, setLoading] = useState(true);

  const toast = useToast();
  const navigate = useNavigate();
  const baseUrl = "http://localhost:8080";

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      // Lấy sản phẩm
      const data = await ProductService.getAll();

      // Lấy danh mục + thương hiệu + review
      const [categories, brands, reviews] = await Promise.all([
        CategoryService.getAll(),
        BrandService.getAll(),
        ReviewService.getAll(),
      ]);

      const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));
      const brandMap = Object.fromEntries(brands.map((b) => [b.id, b.name]));

      // Tính rating trung bình mỗi product (check r.product có tồn tại)
      const ratingMap = {};
      reviews.forEach((r) => {
        const productId = r.product?.id || r.productId; // fallback nếu product undefined
        if (!productId) return; // bỏ qua review không có product

        if (!ratingMap[productId]) ratingMap[productId] = { total: 0, count: 0 };
        ratingMap[productId].total += r.rating || 0;
        ratingMap[productId].count += 1;
      });

      // Map product + thêm imageUrl, category, brand, rating
      const list = data.map((p) => {
        const imageUrl = p.thumbnailUrl
          ? p.thumbnailUrl.startsWith("http")
            ? p.thumbnailUrl
            : `${baseUrl}${p.thumbnailUrl}`
          : "/images/default-product.png";

        const avgRating = ratingMap[p.id]
          ? ratingMap[p.id].total / ratingMap[p.id].count
          : 0;

        return {
          ...p,
          imageUrl,
          category: { name: categoryMap[p.categoryId] || "" },
          brand: { name: brandMap[p.brandId] || "" },
          rating: avgRating,
        };
      });

      setProducts(list);
      setOriginalProducts(list);
    } catch (error) {
      console.error("Lỗi tải sản phẩm:", error);
      toast.error("Không thể tải danh sách sản phẩm!");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let filtered = [...originalProducts];

    if (filters.priceMin)
      filtered = filtered.filter((p) => p.price >= parseInt(filters.priceMin));
    if (filters.priceMax)
      filtered = filtered.filter((p) => p.price <= parseInt(filters.priceMax));
    if (filters.rating)
      filtered = filtered.filter(
        (p) => (p.rating || 0) >= parseInt(filters.rating)
      );
    if (filters.category)
      filtered = filtered.filter(
        (p) =>
          p.category?.name?.toLowerCase() === filters.category.toLowerCase()
      );
    if (filters.brand)
      filtered = filtered.filter(
        (p) => p.brand?.name?.toLowerCase() === filters.brand.toLowerCase()
      );

    setProducts(filtered);
  };

  return (
    <Container>
      <FilterSidebar
        filters={filters}
        onChange={handleFilterChange}
        onApply={applyFilters}
      />
      <MainContent>
        <Header>Tất cả sản phẩm</Header>
        <ProductGrid
          products={products}
          loading={loading}
          navigate={navigate}
        />
      </MainContent>
    </Container>
  );
};

export default ProductList;
