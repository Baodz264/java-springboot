import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Header, Table, Button, SearchInput } from "./style";
import CategoryService from "../../../../services/categoryService";
import { useToast } from "../../../../contexts/ToastProvider";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const fetchData = async () => {
    try {
      const data = await CategoryService.getAll();
      setCategories(data);
    } catch {
      toast.error("Không thể tải danh sách categories!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa category này?")) return;
    try {
      await CategoryService.delete(id);
      toast.success("Xóa category thành công!");
      fetchData();
    } catch {
      toast.error("Xóa category thất bại!");
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (!value) {
      fetchData();
      return;
    }

    try {
      const results = await CategoryService.search(value);
      setCategories(results);
    } catch {
      toast.error("Tìm kiếm thất bại!");
    }
  };

  return (
    <Container>
      <Header>
        <h2>Danh sách Categories</h2>
        <div>
          <SearchInput
            type="text"
            placeholder="Tìm kiếm category..."
            value={keyword}
            onChange={handleSearch}
          />
          <Button onClick={() => navigate("/admin/categories/add")}>+ Thêm</Button>
        </div>
      </Header>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>
                {c.imageUrl ? (
                  <img src={`http://localhost:8080${c.imageUrl}`} alt={c.name} />
                ) : (
                  "Chưa có ảnh"
                )}
              </td>
              <td>
                <Button onClick={() => navigate(`/admin/categories/view/${c.id}`)}>
                  Xem
                </Button>
                <Button onClick={() => navigate(`/admin/categories/edit/${c.id}`)}>
                  Sửa
                </Button>
                <Button $danger onClick={() => handleDelete(c.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CategoryList;
