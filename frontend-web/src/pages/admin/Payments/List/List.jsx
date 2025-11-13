import React, { useEffect, useState, useCallback } from "react";
import PaymentService from "../../../../services/paymentService";
import {
  Container,
  Header,
  Table,
  Button,
  Badge,
  SearchBar,
  Input,
  Select,
  EmptyMessage,
} from "./style";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../contexts/ToastProvider";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    provider: "",
    status: "",
    minAmount: "",
    maxAmount: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

  // 🟩 Hàm lấy toàn bộ danh sách
  const fetchData = useCallback(async () => {
    try {
      const res = await PaymentService.getAll();
      // ✅ Kiểm tra dữ liệu trả về (có thể là object hoặc mảng)
      const data = Array.isArray(res?.data) ? res.data : res || [];
      setPayments(data);
    } catch (error) {
      console.error("❌ Lỗi fetch payments:", error);
      toast.error("Không thể tải danh sách payments!");
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🔍 Tìm kiếm khi filters thay đổi
  useEffect(() => {
    const delay = setTimeout(async () => {
      const { keyword, provider, status, minAmount, maxAmount } = filters;

      if (keyword || provider || status || minAmount || maxAmount) {
        try {
          const res = await PaymentService.search(filters);
          const data = Array.isArray(res?.data) ? res.data : res || [];
          setPayments(data);
        } catch (error) {
          console.error("❌ Lỗi tìm kiếm payment:", error);
          toast.error("Lỗi tìm kiếm payment!");
        }
      } else {
        fetchData();
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [filters, fetchData, toast]);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa payment này?")) return;
    try {
      await PaymentService.delete(id);
      toast.success("Xóa payment thành công!");
      fetchData();
    } catch {
      toast.error("Xóa payment thất bại!");
    }
  };

  return (
    <Container>
      <Header>
        <h2>Danh sách Payments</h2>
        <Button onClick={() => navigate("/admin/payments/add")}>+ Thêm</Button>
      </Header>

      {/* 🔎 Thanh tìm kiếm + filter */}
      <SearchBar>
        <Input
          type="text"
          placeholder="Tìm theo mã giao dịch..."
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
        />
        <Select
          value={filters.provider}
          onChange={(e) => setFilters({ ...filters, provider: e.target.value })}
        >
          <option value="">-- Provider --</option>
          <option value="MOMO">MOMO</option>
          <option value="VNPay">VNPay</option>
          <option value="PayPal">PayPal</option>
        </Select>
        <Select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">-- Trạng thái --</option>
          <option value="PENDING">Đang xử lý</option>
          <option value="SUCCESS">Thành công</option>
          <option value="FAILED">Thất bại</option>
        </Select>
        <Input
          type="number"
          placeholder="Min ₫"
          value={filters.minAmount}
          onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Max ₫"
          value={filters.maxAmount}
          onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
        />
      </SearchBar>

      {/* 🧾 Bảng danh sách */}
      {payments && payments.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Số tiền</th>
              <th>Provider</th>
              <th>Status</th>
              <th>Mã giao dịch</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{(p.amount || 0).toLocaleString()} ₫</td>
                <td>{p.provider}</td>
                <td>
                  <Badge $status={p.status}>{p.status}</Badge>
                </td>
                <td>{p.transactionCode}</td>
                <td>
                  <Button onClick={() => navigate(`/admin/payments/view/${p.id}`)}>Xem</Button>
                  <Button onClick={() => navigate(`/admin/payments/edit/${p.id}`)}>Sửa</Button>
                  <Button $danger onClick={() => handleDelete(p.id)}>Xóa</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <EmptyMessage>Không có dữ liệu payment nào.</EmptyMessage>
      )}
    </Container>
  );
};

export default PaymentList;
