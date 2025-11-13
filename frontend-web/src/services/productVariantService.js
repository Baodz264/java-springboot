import api from "./api";

const ProductVariantService = {
  // Lấy tất cả variant
  getAll: async () => {
    try {
      const response = await api.get("/product-variants");
      return response.data;
    } catch (error) {
      console.error("Error fetching product variants:", error);
      throw error;
    }
  },

  // Lấy variant theo id
  getById: async (id) => {
    try {
      const response = await api.get(`/product-variants/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product variant with id ${id}:`, error);
      throw error;
    }
  },

  // Tạo variant mới (có thể upload ảnh)
  create: async (variant, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("variant", JSON.stringify(variant));
      if (imageFile) formData.append("image", imageFile);

      const response = await api.post("/product-variants", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      console.error("Error creating product variant:", error);
      throw error;
    }
  },

  // Cập nhật variant (có thể upload ảnh)
  update: async (id, variant, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("variant", JSON.stringify(variant));
      if (imageFile) formData.append("image", imageFile);

      const response = await api.put(`/product-variants/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      console.error(`Error updating product variant with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa variant
  delete: async (id) => {
    try {
      await api.delete(`/product-variants/${id}`);
    } catch (error) {
      console.error(`Error deleting product variant with id ${id}:`, error);
      throw error;
    }
  },
};

export default ProductVariantService;
