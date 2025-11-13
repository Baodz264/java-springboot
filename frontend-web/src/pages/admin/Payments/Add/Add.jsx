import React, { useState, useEffect } from "react";
import PaymentService from "../../../../services/paymentService";
import OrderService from "../../../../services/orderService";
import { useNavigate } from "react-router-dom";
import { Container, Header, Form, Label, Input, Select, Button } from "./style";
import { useToast } from "../../../../contexts/ToastProvider";

const PaymentAdd = () => {
  const [form, setForm] = useState({
    amount: "",
    provider: "COD",
    status: "PENDING",
    transactionCode: "",
    orderId: ""
  });
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await OrderService.getAll();
        setOrders(data);
      } catch {
        toast.error("Không thể tải danh sách đơn hàng!");
      }
    };
    fetchOrders();
  }, [toast]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PaymentService.create(form);
      toast.success("Thêm payment thành công!");
      navigate("/admin/payments");
    } catch {
      toast.error("Có lỗi khi thêm payment!");
    }
  };

  return (
    <Container>
      <Header>Thêm Payment</Header>
      <Form onSubmit={handleSubmit}>
        <Label>Số tiền</Label>
        <Input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <Label>Provider</Label>
        <Select name="provider" value={form.provider} onChange={handleChange}>
          <option value="COD">COD</option>
          <option value="BANK">BANK</option>
          <option value="VNPAY">VNPAY</option>
          <option value="MOMO">MOMO</option>
          <option value="ZALOPAY">ZALOPAY</option>
        </Select>

        <Label>Status</Label>
        <Select name="status" value={form.status} onChange={handleChange}>
          <option value="PENDING">PENDING</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="FAILED">FAILED</option>
        </Select>

        <Label>Mã giao dịch</Label>
        <Input
          type="text"
          name="transactionCode"
          value={form.transactionCode}
          onChange={handleChange}
        />

        <Label>Order</Label>
        <Select
          name="orderId"
          value={form.orderId}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn đơn hàng --</option>
          {orders.map((order) => (
            <option key={order.id} value={order.id}>
              #{order.id} - {order.customerName || "Khách hàng"}
            </option>
          ))}
        </Select>

        <Button type="submit">Thêm</Button>
      </Form>
    </Container>
  );
};

export default PaymentAdd;
