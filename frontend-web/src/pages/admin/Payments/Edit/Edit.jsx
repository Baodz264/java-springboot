import React, { useEffect, useState } from "react";
import PaymentService from "../../../../services/paymentService";
import OrderService from "../../../../services/orderService";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Header, Form, Label, Input, Select, Button } from "./style";
import { useToast } from "../../../../contexts/ToastProvider";

const PaymentEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentData, ordersData] = await Promise.all([
          PaymentService.getById(id),
          OrderService.getAll()
        ]);
        setForm({
          amount: paymentData.amount || "",
          provider: paymentData.provider || "COD",
          status: paymentData.status || "PENDING",
          transactionCode: paymentData.transactionCode || "",
          orderId: paymentData.order?.id || ""
        });
        setOrders(ordersData);
      } catch {
        toast.error("Không thể tải dữ liệu payment!");
      }
    };
    fetchData();
  }, [id, toast]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PaymentService.update(id, form);
      toast.success("Cập nhật payment thành công!");
      navigate("/admin/payments");
    } catch {
      toast.error("Cập nhật payment thất bại!");
    }
  };

  if (!form) return <p>Đang tải...</p>;

  return (
    <Container>
      <Header>Sửa Payment</Header>
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

        <Button type="submit" $variant="edit">Cập nhật</Button>
      </Form>
    </Container>
  );
};

export default PaymentEdit;
