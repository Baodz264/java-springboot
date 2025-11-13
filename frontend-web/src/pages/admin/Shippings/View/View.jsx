// src/pages/admin/Shippings/View.jsx
import React, { useEffect, useState } from "react";
import ShippingService from "../../../../services/shippingService";
import OrderService from "../../../../services/orderService"; // ✅ thêm
import { useParams, useNavigate } from "react-router-dom";
import { Container, Header, Detail, Button, Badge, ActionBox } from "./style";
import { useToast } from "../../../../contexts/ToastProvider";

const ShippingView = () => {
  const { id } = useParams();
  const [shipping, setShipping] = useState(null);
  const [order, setOrder] = useState(null); // ✅ thêm
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ShippingService.getById(id);
        setShipping(data);

        // ✅ nếu API chỉ trả về orderId thì gọi thêm OrderService
        const orderId = data.order?.id || data.orderId;
        if (orderId) {
          const orderData = await OrderService.getById(orderId);
          setOrder(orderData);
        }
      } catch {
        toast.error("Không thể tải chi tiết shipping!");
      }
    };
    fetchData();
  }, [id, toast]);

  if (!shipping) return <p>Đang tải...</p>;

  return (
    <Container>
      <Header><h2>Chi tiết Shipping</h2></Header>
      <Detail>
        <p><strong>ID:</strong> {shipping.id}</p>
        <p><strong>Địa chỉ:</strong> {shipping.shippingAddress}</p>
        <p><strong>Provider:</strong> {shipping.shippingProvider}</p>
        <p><strong>Tracking:</strong> {shipping.trackingNumber}</p>
        <p><strong>Phí vận chuyển:</strong> {shipping.shippingFee?.toLocaleString()} đ</p>
        <p>
          <strong>Trạng thái:</strong>{" "}
          <Badge $status={shipping.status}>{shipping.status}</Badge>
        </p>
        <p><strong>Ngày dự kiến:</strong> {shipping.estimatedDelivery}</p>
        <p><strong>Ngày giao thực tế:</strong> {shipping.deliveredAt || "Chưa giao"}</p>

        {/* ✅ hiển thị Order ID + status */}
        <p>
          <strong>Order ID:</strong>{" "}
          {order ? (
            <>
              {order.id} - {order.status}
            </>
          ) : shipping.orderId ? (
            shipping.orderId
          ) : (
            "Không có"
          )}
        </p>
      </Detail>

      <ActionBox>
        <Button onClick={() => navigate("/admin/shippings")}>⬅ Quay lại</Button>
        <Button onClick={() => navigate(`/admin/shippings/edit/${shipping.id}`)}>✏ Sửa</Button>
      </ActionBox>
    </Container>
  );
};

export default ShippingView;
