// src/pages/admin/Brands/Edit.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Header, Form, Label, Input, Button } from "./style";
import BrandService from "../../../../services/brandService";
import { useToast } from "../../../../contexts/ToastProvider";

const BrandEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({ name: "", description: "", status: true });
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await BrandService.getById(id);
        setForm({
          name: data.name || "",
          description: data.description || "",
          status: data.status ?? true,
        });
      } catch {
        toast.error("Không thể tải dữ liệu brand!");
      }
    };
    fetchData();
  }, [id, toast]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await BrandService.update(id, form, logoFile);
      toast.success("Cập nhật brand thành công!");
      navigate("/admin/brands");
    } catch {
      toast.error("Cập nhật brand thất bại!");
    }
  };

  return (
    <Container>
      <Header>
        <h2>Sửa Brand</h2>
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

        <Button type="submit">Cập nhật</Button>
      </Form>
    </Container>
  );
};

export default BrandEdit;
