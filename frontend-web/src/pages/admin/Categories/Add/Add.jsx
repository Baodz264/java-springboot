// src/pages/admin/Categories/Add.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Header, Form, Label, Input, Button } from "./style";
import CategoryService from "../../../../services/categoryService";
import { useToast } from "../../../../contexts/ToastProvider";

const CategoryAdd = () => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CategoryService.create({ name }, imageFile);
      toast.success("Thêm category thành công!");
      navigate("/admin/categories");
    } catch {
      toast.error("Thêm category thất bại!");
    }
  };

  return (
    <Container>
      <Header>
        <h2>Thêm Category</h2>
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
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <Button type="submit">Thêm</Button>
      </Form>
    </Container>
  );
};

export default CategoryAdd;
