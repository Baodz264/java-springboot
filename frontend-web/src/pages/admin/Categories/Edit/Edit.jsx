// src/pages/admin/Categories/Edit.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Header, Form, Label, Input, Button } from "./style";
import CategoryService from "../../../../services/categoryService";
import { useToast } from "../../../../contexts/ToastProvider";

const CategoryEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await CategoryService.getById(id);
        setName(data.name);
        setImageUrl(data.imageUrl);
      } catch {
        toast.error("Không thể tải category!");
      }
    };
    fetchCategory();
  }, [id, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CategoryService.update(id, { name }, imageFile);
      toast.success("Cập nhật category thành công!");
      navigate("/admin/categories");
    } catch {
      toast.error("Cập nhật category thất bại!");
    }
  };

  return (
    <Container>
      <Header>
        <h2>Sửa Category</h2>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">Tên category</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Label htmlFor="image">Ảnh category</Label>
        {imageUrl && <img src={imageUrl} alt={name} style={{ maxWidth: "150px", marginBottom: "10px" }} />}
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <Button type="submit">Cập nhật</Button>
      </Form>
    </Container>
  );
};

export default CategoryEdit;
