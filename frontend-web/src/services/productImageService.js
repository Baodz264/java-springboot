import api from "./api";

const ProductImageService = {
  // Lấy tất cả hình ảnh sản phẩm
  getAll: async () => {
    try {
      const response = await api.get("/product-images");
      return response.data;
    } catch (error) {
      console.error("Error fetching product images:", error);
      throw error;
    }
  },

  // Lấy hình ảnh sản phẩm theo id
  getById: async (id) => {
    try {
      const response = await api.get(`/product-images/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product image with id ${id}:`, error);
      throw error;
    }
  },

  // Tạo hình ảnh mới (có thể upload)
  create: async (productImage, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("productImage", JSON.stringify(productImage));
      if (imageFile) formData.append("image", imageFile);

      const response = await api.post("/product-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      console.error("Error creating product image:", error);
      throw error;
    }
  },

  // Cập nhật hình ảnh sản phẩm
  update: async (id, productImage, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("productImage", JSON.stringify(productImage));
      if (imageFile) formData.append("image", imageFile);

      const response = await api.put(`/product-images/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      console.error(`Error updating product image with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa hình ảnh sản phẩm
  delete: async (id) => {
    try {
      await api.delete(`/product-images/${id}`);
    } catch (error) {
      console.error(`Error deleting product image with id ${id}:`, error);
      throw error;
    }
  },
};

export default ProductImageService;
