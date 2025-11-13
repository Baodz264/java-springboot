import React, { useEffect, useState } from "react";
import ShippingService from "../../../../services/shippingService";
import OrderService from "../../../../services/orderService"; // thêm
import { useParams, useNavigate } from "react-router-dom";
import { Container, Header, Form, Label, Input, Select, Button } from "./style";
import { useToast } from "../../../../contexts/ToastProvider";

const ShippingEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, ordersData] = await Promise.all([
          ShippingService.getById(id),
          OrderService.getAll(),
        ]);

        setForm({
          shippingAddress: data.shippingAddress || "",
          shippingProvider: data.shippingProvider || "",
          trackingNumber: data.trackingNumber || "",
          shippingFee: data.shippingFee ?? "",
          status: data.status || "PENDING",
          estimatedDelivery: data.estimatedDelivery || "",
          // hỗ trợ cả trường order object hoặc orderId
          orderId: data.order?.id ? String(data.order.id) : (data.orderId ? String(data.orderId) : ""),
        });

        setOrders(ordersData);
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải dữ liệu shipping!");
      }
    };
    fetchData();
  }, [id, toast]);

  if (!form) return <p>Đang tải...</p>;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        orderId: form.orderId ? Number(form.orderId) : null,
        shippingFee: form.shippingFee ? Number(form.shippingFee) : null,
      };
      await ShippingService.update(id, payload);
      toast.success("Cập nhật shipping thành công!");
      navigate("/admin/shippings");
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật shipping thất bại!");
    }
  };

  return (
    <Container>
      <Header><h2>Sửa Shipping</h2></Header>
      <Form onSubmit={handleSubmit}>
        <Label>Địa chỉ</Label>
        <Input name="shippingAddress" value={form.shippingAddress} onChange={handleChange} required />

        <Label>Provider</Label>
        <Input name="shippingProvider" value={form.shippingProvider} onChange={handleChange} required />

        <Label>Tracking Number</Label>
        <Input name="trackingNumber" value={form.trackingNumber} onChange={handleChange} />

        <Label>Phí vận chuyển</Label>
        <Input type="number" name="shippingFee" value={form.shippingFee} onChange={handleChange} />

        <Label>Trạng thái</Label>
        <Select name="status" value={form.status} onChange={handleChange}>
          <option value="PENDING">PENDING</option>
          <option value="SHIPPING">SHIPPING</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="RETURNED">RETURNED</option>
          <option value="CANCELLED">CANCELLED</option>
        </Select>

        <Label>Ngày giao dự kiến</Label>
        <Input type="date" name="estimatedDelivery" value={form.estimatedDelivery} onChange={handleChange} />

        <Label>Order</Label>
        <Select name="orderId" value={form.orderId} onChange={handleChange} required>
          <option value="">-- Chọn đơn hàng --</option>
          {orders.map((order) => (
            <option key={order.id} value={order.id}>
              #{order.id} - {order.customerName || "Khách hàng"} {order.totalAmount ? `- ${order.totalAmount.toLocaleString()} đ` : ""}
            </option>
          ))}
        </Select>

        <Button type="submit">Cập nhật</Button>
      </Form>
    </Container>
  );
};

export default ShippingEdit;
