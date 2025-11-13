// src/services/CategoryService.js
import api from "./api";

const CategoryService = {
  // Lấy tất cả category
  getAll: async () => {
    try {
      const response = await api.get("/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Lấy category theo id
  getById: async (id) => {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category with id ${id}:`, error);
      throw error;
    }
  },

  // Tạo category mới (có thể kèm ảnh)
  create: async (category, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("category", JSON.stringify(category));
      if (imageFile) formData.append("image", imageFile);

      const response = await api.post("/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  // Cập nhật category (có thể kèm ảnh mới)
  update: async (id, category, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("category", JSON.stringify(category));
      if (imageFile) formData.append("image", imageFile);

      const response = await api.put(`/categories/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating category with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa category
  delete: async (id) => {
    try {
      await api.delete(`/categories/${id}`);
    } catch (error) {
      console.error(`Error deleting category with id ${id}:`, error);
      throw error;
    }
  },

  // Upload ảnh riêng (nếu muốn)
  uploadImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await api.post("/categories/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading category image:", error);
      throw error;
    }
  },
  // Tìm kiếm category
  search: async (keyword) => {
    try {
      const response = await api.get(`/categories/search?keyword=${keyword}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error searching categories with keyword "${keyword}":`,
        error
      );
      throw error;
    }
  },
};

export default CategoryService;
