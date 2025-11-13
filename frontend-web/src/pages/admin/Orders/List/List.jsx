import React, { useEffect, useState, useCallback } from "react";
import OrderService from "../../../../services/orderService";
import UserService from "../../../../services/userService";
import {
  Table,
  Button,
  Container,
  Header,
  Form,
  Input,
  Select,
  Badge,
} from "./style";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../contexts/ToastProvider";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState({
    userId: "",
    status: "",
    paymentMethod: "",
    shippingAddress: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

  // ✅ Dùng useCallback để ổn định hàm fetchOrders
  const fetchOrders = useCallback(async () => {
    try {
      const response = await OrderService.getAll();
      // Nếu API trả về object { data: [...] }, dùng response.data
      const data = Array.isArray(response) ? response : response.data || [];
      setOrders(data);
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error);
      toast.error("Lỗi khi lấy danh sách đơn hàng!");
    }
  }, [toast]);

  // ✅ Lấy danh sách user để hiển thị tên
  const fetchUsers = useCallback(async () => {
    try {
      const response = await UserService.getAll();
      const data = Array.isArray(response) ? response : response.data || [];
      setUsers(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user:", error);
      toast.error("Lỗi khi lấy danh sách user!");
    }
  }, [toast]);

  useEffect(() => {
    fetchOrders();
    fetchUsers();
  }, [fetchOrders, fetchUsers]);

  // ✅ Xóa đơn hàng
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
      try {
        await OrderService.delete(id);
        setOrders((prev) => prev.filter((order) => order.id !== id));
        toast.success("Xóa đơn hàng thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa đơn hàng:", error);
        toast.error("Xóa đơn hàng thất bại!");
      }
    }
  };

  // ✅ Cập nhật giá trị tìm kiếm
  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  // ✅ Tìm kiếm
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const params = Object.fromEntries(
        Object.entries(search).filter(([_, v]) => v)
      );
      const response =
        Object.keys(params).length > 0
          ? await OrderService.search(params)
          : await OrderService.getAll();
      const data = Array.isArray(response) ? response : response.data || [];
      setOrders(data);
      toast.success("Tìm kiếm thành công!");
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
      toast.error("Tìm kiếm thất bại!");
    }
  };

  // ✅ Xuất Excel
  const handleExportExcel = async () => {
    try {
      const blob = await OrderService.exportExcel();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "orders.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Xuất Excel thành công!");
    } catch (error) {
      console.error("Lỗi xuất Excel:", error);
      toast.error("Xuất Excel thất bại!");
    }
  };

  const getUserName = (userId) => {
    return users.find((u) => u.id === userId)?.fullName || "N/A";
  };

  return (
    <Container>
      <Header>Danh sách đơn hàng</Header>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <Button onClick={() => navigate("/admin/orders/add")}>Thêm mới</Button>
        <Button onClick={handleExportExcel}>Xuất Excel</Button>
      </div>

      {/* Form tìm kiếm */}
      <Form onSubmit={handleSearch}>
        <Select
          name="userId"
          value={search.userId}
          onChange={handleSearchChange}
        >
          <option value="">Chọn User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.fullName}
            </option>
          ))}
        </Select>

        <Select
          name="status"
          value={search.status}
          onChange={handleSearchChange}
        >
          <option value="">Chọn trạng thái</option>
          <option value="PENDING">PENDING</option>
          <option value="PAID">PAID</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </Select>

        <Select
          name="paymentMethod"
          value={search.paymentMethod}
          onChange={handleSearchChange}
        >
          <option value="">Chọn thanh toán</option>
          <option value="COD">COD</option>
          <option value="BANK">BANK</option>
          <option value="VNPAY">VNPAY</option>
          <option value="MOMO">MOMO</option>
          <option value="ZALOPAY">ZALOPAY</option>
        </Select>

        <Input
          name="shippingAddress"
          placeholder="Địa chỉ"
          value={search.shippingAddress}
          onChange={handleSearchChange}
        />

        <Button type="submit">Tìm kiếm</Button>
      </Form>

      {/* Bảng danh sách đơn hàng */}
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Tổng giá</th>
            <th>Trạng thái</th>
            <th>Thanh toán</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{getUserName(o.userId)}</td>
                <td>{o.totalPrice?.toLocaleString("vi-VN")} ₫</td>
                <td>
                  <Badge $status={o.status}>{o.status}</Badge>
                </td>
                <td>{o.paymentMethod}</td>
                <td>{o.shippingAddress}</td>
                <td>
                  <Button
                    onClick={() => navigate(`/admin/orders/view/${o.id}`)}
                  >
                    Xem
                  </Button>
                  <Button
                    onClick={() => navigate(`/admin/orders/edit/${o.id}`)}
                  >
                    Sửa
                  </Button>
                  <Button $danger onClick={() => handleDelete(o.id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Không có đơn hàng nào
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrderList;
