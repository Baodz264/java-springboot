// src/services/reviewService.js
import api from "./api";

/**
 * Chức năng upload ảnh sử dụng FormData.
 * Backend của bạn yêu cầu:
 * - review: JSON string
 * - image: file (optional)
 */
const ReviewService = {
  // Lấy tất cả review
  getAll: async () => {
    const response = await api.get("/reviews");
    return response.data;
  },

  // Lấy review theo id
  getById: async (id) => {
    const response = await api.get(`/reviews/${id}`);
    return response.data;
  },

  // Tạo review mới
  create: async (review, imageFile) => {
    const formData = new FormData();
    formData.append("review", JSON.stringify(review));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await api.post("/reviews", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Cập nhật review
  update: async (id, review, imageFile) => {
    const formData = new FormData();
    formData.append("review", JSON.stringify(review));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await api.put(`/reviews/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Xóa review
  delete: async (id) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },

  // 🔍 Search review
  search: async (params) => {
    // params: { keyword, productId, userId, minRating, maxRating }
    const response = await api.get("/reviews/search", { params });
    return response.data;
  },
};

export default ReviewService;
