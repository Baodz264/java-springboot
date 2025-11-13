import React, { useState, useEffect } from "react";
import ShippingService from "../../../../services/shippingService";
import OrderService from "../../../../services/orderService"; // thêm
import { useNavigate } from "react-router-dom";
import { Container, Header, Form, Label, Input, Select, Button } from "./style";
import { useToast } from "../../../../contexts/ToastProvider";

const ShippingAdd = () => {
  const [form, setForm] = useState({
    shippingAddress: "",
    shippingProvider: "",
    trackingNumber: "",
    shippingFee: "",
    status: "PENDING",
    estimatedDelivery: "",
    orderId: "",
  });
  const [orders, setOrders] = useState([]); // danh sách order để chọn
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await OrderService.getAll();
        setOrders(data);
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải danh sách đơn hàng!");
      }
    };
    fetchOrders();
  }, [toast]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // chuyển orderId sang number nếu có
      const payload = {
        ...form,
        orderId: form.orderId ? Number(form.orderId) : null,
        shippingFee: form.shippingFee ? Number(form.shippingFee) : null,
      };
      await ShippingService.create(payload);
      toast.success("Thêm shipping thành công!");
      navigate("/admin/shippings");
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi thêm shipping!");
    }
  };

  return (
    <Container>
      <Header><h2>Thêm Shipping</h2></Header>
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

        <Button type="submit">Thêm</Button>
      </Form>
    </Container>
  );
};

export default ShippingAdd;
