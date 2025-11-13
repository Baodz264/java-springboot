// src/pages/admin/Brands/List/BrandList.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Header, Table, Button } from "./style";
import BrandService from "../../../../services/brandService";
import { useToast } from "../../../../contexts/ToastProvider";

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  // ✅ Dùng useCallback để tránh warning eslint
  const fetchData = useCallback(async () => {
    try {
      const data = await BrandService.getAll();
      setBrands(data);
    } catch {
      toast.error("Không thể tải danh sách brand!");
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa brand này?")) return;
    try {
      await BrandService.delete(id);
      toast.success("Xóa brand thành công!");
      fetchData();
    } catch {
      toast.error("Xóa brand thất bại!");
    }
  };

  const handleSearch = async () => {
    try {
      if (!keyword.trim()) return fetchData();
      const data = await BrandService.search(keyword);
      setBrands(data);
    } catch {
      toast.error("Lỗi khi tìm kiếm brand!");
    }
  };

  const resetSearch = () => {
    setKeyword("");
    fetchData();
  };

  return (
    <Container>
      <Header>
        <h2>Danh sách Brands</h2>
        <Button onClick={() => navigate("/admin/brands/add")}>+ Thêm</Button>
      </Header>

      {/* Search */}
      <div style={{ margin: "10px 0", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên brand..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button onClick={handleSearch}>Tìm kiếm</Button>
        <Button onClick={resetSearch}>Reset</Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Logo</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.name}</td>
              <td>{b.description}</td>
              <td>
                {b.logoUrl ? (
                  <img
                    src={b.logoUrl.startsWith("http") ? b.logoUrl : `http://localhost:8080${b.logoUrl}`}
                    alt={b.name}
                    style={{ width: "80px", borderRadius: "5px" }}
                    onError={(e) => { e.target.src = "/images/default-brand.png"; }}
                  />
                ) : (
                  <img
                    src="/images/default-brand.png"
                    alt="default"
                    style={{ width: "80px", borderRadius: "5px" }}
                  />
                )}
              </td>
              <td>
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontWeight: "500",
                    color: b.status ? "#155724" : "#721c24",
                    backgroundColor: b.status ? "#d4edda" : "#f8d7da",
                  }}
                >
                  {b.status ? "Hoạt động" : "Không hoạt động"}
                </span>
              </td>
              <td>
                <Button onClick={() => navigate(`/admin/brands/view/${b.id}`)}>Xem</Button>
                <Button onClick={() => navigate(`/admin/brands/edit/${b.id}`)}>Sửa</Button>
                <Button $danger onClick={() => handleDelete(b.id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BrandList;
