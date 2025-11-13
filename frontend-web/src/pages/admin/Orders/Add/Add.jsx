import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderService from "../../../../services/orderService";
import UserService from "../../../../services/userService";
import { Container, Header, Form, Input, Select, Button } from "./style";
import { useToast } from "../../../../contexts/ToastProvider";

const OrderAdd = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState({
    userId: "",
    totalPrice: "",
    status: "PENDING",
    paymentMethod: "COD",
    shippingAddress: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserService.getAll();
        setUsers(data);
      } catch (error) {
        console.error("Lỗi khi lấy user:", error);
        toast.error("Lỗi khi lấy danh sách user!");
      }
    };
    fetchUsers();
  }, [toast]); // ✅ thêm toast vào dependency

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await OrderService.create(order);
      toast.success("Thêm đơn hàng thành công!");
      navigate("/admin/orders");
    } catch (error) {
      console.error("Lỗi khi thêm đơn hàng:", error);
      toast.error("Thêm đơn hàng thất bại!");
    }
  };

  return (
    <Container>
      <Header>Thêm đơn hàng mới</Header>
      <Form onSubmit={handleSubmit}>
        <Select name="userId" value={order.userId} onChange={handleChange} required>
          <option value="">Chọn User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.fullName}
            </option>
          ))}
        </Select>

        <Input
          name="totalPrice"
          type="number"
          placeholder="Tổng giá"
          value={order.totalPrice}
          onChange={handleChange}
          required
        />

        <Select name="status" value={order.status} onChange={handleChange}>
          <option value="PENDING">PENDING</option>
          <option value="PAID">PAID</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </Select>

        <Select name="paymentMethod" value={order.paymentMethod} onChange={handleChange}>
          <option value="COD">COD</option>
          <option value="BANK">BANK</option>
          <option value="VNPAY">VNPAY</option>
          <option value="MOMO">MOMO</option>
          <option value="ZALOPAY">ZALOPAY</option>
        </Select>

        <Input
          name="shippingAddress"
          placeholder="Địa chỉ"
          value={order.shippingAddress}
          onChange={handleChange}
          required
        />

        <Button type="submit">Thêm mới</Button>
        <Button type="button" onClick={() => navigate("/admin/orders")}>
          Hủy
        </Button>
      </Form>
    </Container>
  );
};

export default OrderAdd;
