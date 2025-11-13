import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Header, Detail, Button } from "./style";
import CategoryService from "../../../../services/categoryService";
import { useToast } from "../../../../contexts/ToastProvider";

const CategoryView = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await CategoryService.getById(id);
        setCategory(data);
      } catch {
        toast.error("Không thể tải category!");
      }
    };
    fetchCategory();
  }, [id, toast]);

  if (!category) return <p>Đang tải...</p>;

  // Xử lý URL ảnh: nếu không bắt đầu bằng http, thêm base URL backend
  const imageUrl = category.imageUrl
    ? category.imageUrl.startsWith("http")
      ? category.imageUrl
      : `http://localhost:8080${category.imageUrl}`
    : "/images/default-category.png"; // fallback ảnh default

  return (
    <Container>
      <Header>
        <h2>Chi tiết Category</h2>
        <Button onClick={() => navigate("/admin/categories")}>⬅ Quay lại</Button>
      </Header>
      <Detail>
        <p><strong>ID:</strong> {category.id}</p>
        <p><strong>Tên:</strong> {category.name}</p>
        <img
          src={imageUrl}
          alt={category.name}
          style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "5px" }}
          onError={(e) => { e.target.src = "/images/default-category.png"; }}
        />
      </Detail>
    </Container>
  );
};

export default CategoryView;
