import React, { useEffect, useState, useCallback } from "react";
import ShippingService from "../../../../services/shippingService";
import { Container, Header, Table, Button, Badge, SearchBar } from "./style";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../contexts/ToastProvider";

const ShippingList = () => {
  const [shippings, setShippings] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  // ✅ useCallback để tránh re-creation hàm
  const fetchData = useCallback(async () => {
    try {
      const response = await ShippingService.getAll();
      setShippings(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error(error);
      toast.error("Không thể tải danh sách shipping!");
    }
  }, [toast]);

  const handleSearch = async () => {
    try {
      if (!keyword.trim()) {
        fetchData();
      } else {
        const response = await ShippingService.search(keyword);
        setShippings(Array.isArray(response) ? response : []);
      }
    } catch (error) {
      console.error(error);
      toast.error("Tìm kiếm shipping thất bại!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa shipping này?")) return;
    try {
      await ShippingService.delete(id);
      toast.success("Xóa shipping thành công!");
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Xóa shipping thất bại!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]); // ✅ thêm fetchData vào dependency array

  return (
    <Container>
      <Header>
        <h2>Danh sách Shipping</h2>
        <div>
          <SearchBar
            type="text"
            placeholder="Tìm shipping..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button onClick={handleSearch}>🔍 Tìm</Button>
          <Button onClick={() => navigate("/admin/shippings/add")}>+ Thêm</Button>
        </div>
      </Header>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Địa chỉ</th>
            <th>Provider</th>
            <th>Trạng thái</th>
            <th>Phí vận chuyển</th>
            <th>Tracking</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {shippings.length > 0 ? (
            shippings.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.shippingAddress}</td>
                <td>{s.shippingProvider}</td>
                <td>
                  <Badge $status={s.status}>{s.status}</Badge>
                </td>
                <td>{s.shippingFee?.toLocaleString()} đ</td>
                <td>{s.trackingNumber}</td>
                <td>
                  <Button onClick={() => navigate(`/admin/shippings/view/${s.id}`)}>Xem</Button>
                  <Button onClick={() => navigate(`/admin/shippings/edit/${s.id}`)}>Sửa</Button>
                  <Button $danger onClick={() => handleDelete(s.id)}>Xóa</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Không có dữ liệu shipping
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ShippingList;
