import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../contexts/ToastProvider";

import OrderService from "../../../services/orderService";
import { createOrderItem } from "../../../services/orderItemService";
import ShippingService from "../../../services/shippingService";
import PaymentService from "../../../services/paymentService";
import CartItemService from "../../../services/cartItemService";

const generateTransactionCode = () => {
  const timestamp = Date.now();
  const randomPart = Math.floor(Math.random() * 10000);
  return `TX${timestamp}${randomPart}`;
};

export default function VNPayReturn() {
  const navigate = useNavigate();
  const toast = useToast();
  const [processing, setProcessing] = useState(true);
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const handleVNPayReturn = async () => {
      try {
        // --- Lấy tham số trả về từ VNPay ---
        const params = new URLSearchParams(window.location.search);
        const vnpResponseCode = params.get("vnp_ResponseCode");
        const pendingOrderStr = localStorage.getItem("pendingOrder");

        if (!pendingOrderStr) {
          toast.error("Không tìm thấy đơn hàng tạm thời!");
          navigate("/");
          return;
        }

        const pendingOrder = JSON.parse(pendingOrderStr);
        localStorage.removeItem("pendingOrder");

        const transactionCode = generateTransactionCode();
        console.log("🧾 VNPayReturn - pendingOrder:", pendingOrder);

        if (vnpResponseCode === "00") {
          // ✅ Thanh toán thành công
          const orderPayload = {
            userId: pendingOrder.userId,
            shippingAddress: pendingOrder.shippingAddress,
            paymentMethod: pendingOrder.paymentMethod,
            totalPrice: pendingOrder.totalPrice,
            voucherCode: pendingOrder.voucherCode || null,
            discountAmount: pendingOrder.discountAmount || 0,
          };

          // 🧱 Tạo đơn hàng
          const newOrderRes = await OrderService.create(orderPayload);
          const newOrder = newOrderRes?.data || newOrderRes;
          console.log("🆕 Đơn hàng mới:", newOrder);

          // 🧩 Tạo chi tiết đơn hàng
          if (pendingOrder.cartItems?.length > 0) {
            await Promise.all(
              pendingOrder.cartItems.map((item) =>
                createOrderItem({
                  orderId: newOrder.id,
                  productVariantId: item.productVariantId,
                  quantity: item.quantity,
                  price: item.price,
                })
              )
            );
            console.log("✅ Order items đã tạo");
          }

          // 🚚 Tạo thông tin giao hàng
          await ShippingService.create({
            orderId: newOrder.id,
            shippingAddress: pendingOrder.shippingAddress,
            shippingProvider: pendingOrder.shippingProvider,
            shippingFee: pendingOrder.shippingFee,
            status: "PENDING",
          });
          console.log("🚚 Shipping đã tạo");

          // 💳 Tạo thông tin thanh toán
          await PaymentService.create({
            amount: pendingOrder.totalPrice,
            provider: "VNPAY",
            status: "COMPLETED",
            transactionCode,
            orderId: newOrder.id,
          });
          console.log("💳 Payment đã tạo");

          // 🛒 Xóa sản phẩm trong giỏ hàng
          if (pendingOrder.cartItems?.length > 0) {
            try {
              await Promise.all(
                pendingOrder.cartItems.map(async (item) => {
                  if (item.id) {
                    await CartItemService.delete(item.id);
                    console.log(`🗑️ Đã xóa cart item ID: ${item.id}`);
                  } else {
                    console.warn("⚠️ Cart item không có id:", item);
                  }
                })
              );

              // Gửi event để cập nhật lại UI giỏ hàng
              window.dispatchEvent(new Event("cartUpdated"));
              console.log("✅ Giỏ hàng đã được làm trống sau khi thanh toán VNPay");
            } catch (err) {
              console.error("❌ Lỗi khi xóa giỏ hàng:", err);
            }
          }

          toast.success("🎉 Thanh toán VNPay thành công!");
        } else {
          // ❌ Thanh toán thất bại hoặc bị hủy
          await PaymentService.create({
            amount: pendingOrder.totalPrice,
            provider: "VNPAY",
            status: "FAILED",
            transactionCode,
            orderId: null,
          });

          toast.error("Thanh toán VNPay thất bại hoặc bị hủy!");
        }

        navigate("/");
      } catch (err) {
        console.error("❌ Lỗi xử lý VNPayReturn:", err);
        toast.error("Xử lý thanh toán VNPay thất bại!");
        navigate("/");
      } finally {
        setProcessing(false);
      }
    };

    handleVNPayReturn();
  }, [navigate, toast]);

  if (processing) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        Đang xử lý thanh toán VNPay...
      </div>
    );
  }

  return null;
}
