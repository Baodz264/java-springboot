import api from "./api";

/**
 * Gọi API tạo link thanh toán VNPay
 * @param {Object} data - { orderId, amount, bankCode, locale, returnUrl }
 * @returns {Promise<string>} URL thanh toán VNPay
 */
const VNPayService = {
  createPayment: async (data) => {
    try {
      const response = await api.post("/vnpay/create-payment", data);

      if (response.data.code === "00") {
        return response.data.paymentUrl; // ✅ URL thanh toán thành công
      } else {
        throw new Error(response.data.message || "Tạo link thanh toán thất bại");
      }
    } catch (error) {
      console.error("❌ VNPayService error:", error);
      throw error;
    }
  },
};

export default VNPayService;
