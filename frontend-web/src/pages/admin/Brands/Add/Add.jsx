// src/pages/admin/Brands/Add.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Header, Form, Label, Input, Button } from "./style";
import BrandService from "../../../../services/brandService";
import { useToast } from "../../../../contexts/ToastProvider";

const BrandAdd = () => {
  const [form, setForm] = useState({ name: "", description: "", status: true });
  const [logoFile, setLogoFile] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await BrandService.create(form, logoFile);
      toast.success("Thêm brand thành công!");
      navigate("/admin/brands");
    } catch {
      toast.error("Thêm brand thất bại!");
    }
  };

  return (
    <Container>
      <Header>
        <h2>Thêm Brand</h2>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Label>Tên Brand</Label>
        <Input name="name" value={form.name} onChange={handleChange} required />

        <Label>Mô tả</Label>
        <Input name="description" value={form.description} onChange={handleChange} />

        <Label>Logo</Label>
        <Input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} />

        <Label>
          <Input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.checked })}
          />
          Hoạt động
        </Label>

        <Button type="submit">Thêm</Button>
      </Form>
    </Container>
  );
};

export default BrandAdd;
