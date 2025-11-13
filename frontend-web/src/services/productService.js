// src/services/ProductService.js
import api from "./api";

const ProductService = {
  // Lấy tất cả sản phẩm
  getAll: async () => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Lấy sản phẩm theo id
  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw error;
    }
  },

  // Tạo sản phẩm (có upload ảnh)
  create: async (product, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("product", JSON.stringify(product));
      if (imageFile) formData.append("image", imageFile);

      const response = await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  // Cập nhật sản phẩm (có upload ảnh)
  update: async (id, product, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("product", JSON.stringify(product));
      if (imageFile) formData.append("image", imageFile);

      const response = await api.put(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa sản phẩm
  delete: async (id) => {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw error;
    }
  },

  // 🔎 Tìm kiếm sản phẩm (keyword + khoảng giá + danh mục + thương hiệu)
  search: async ({
    keyword = "",
    minPrice = null,
    maxPrice = null,
    categoryId = null,
    brandId = null,
  } = {}) => {
    try {
      // Xây dựng query params linh hoạt
      const params = new URLSearchParams();

      if (keyword && keyword.trim() !== "") params.append("keyword", keyword);
      if (minPrice !== null && minPrice !== "")
        params.append("minPrice", minPrice);
      if (maxPrice !== null && maxPrice !== "")
        params.append("maxPrice", maxPrice);
      if (categoryId !== null && categoryId !== "")
        params.append("categoryId", categoryId);
      if (brandId !== null && brandId !== "") params.append("brandId", brandId);

      const url =
        params.toString().length > 0
          ? `/products/search?${params.toString()}`
          : "/products";

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },
};

export default ProductService;
