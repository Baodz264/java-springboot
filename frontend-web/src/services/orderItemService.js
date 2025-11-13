// src/services/orderItemService.js
import api from "./api";

// Lấy tất cả order item
export const getAllOrderItems = async () => {
  const res = await api.get("/order-items");
  return res.data;
};

// Lấy order item theo id
export const getOrderItemById = async (id) => {
  const res = await api.get(`/order-items/${id}`);
  return res.data;
};

// Tạo mới order item
export const createOrderItem = async (orderItem) => {
  const res = await api.post("/order-items", orderItem);
  return res.data;
};

// Cập nhật order item
export const updateOrderItem = async (id, orderItem) => {
  const res = await api.put(`/order-items/${id}`, orderItem);
  return res.data;
};

// Xóa order item
export const deleteOrderItem = async (id) => {
  await api.delete(`/order-items/${id}`);
};
// 🔍 Search order items theo orderId, productVariantId hoặc cả hai
export const searchOrderItems = async ({ orderId, productVariantId }) => {
  const res = await api.get("/order-items/search", {
    params: { orderId, productVariantId },
  });
  return res.data;
};
