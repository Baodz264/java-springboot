import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../../../services/userService";
import { useToast } from "../../../../contexts/ToastProvider";
import { Container, Header, Form, Label, Input, Select, Button } from "./style";

const UserAdd = () => {
  const navigate = useNavigate();
  const { success, error } = useToast();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "USER",
    status: true,
    gender: "OTHER",
    dateOfBirth: ""
  });
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.create(form, avatar);
      success("Thêm user thành công!");
      navigate("/admin/users");
    } catch {
      error("Lỗi khi thêm user");
    }
  };

  return (
    <Container>
      <Header>Thêm User</Header>
      <Form onSubmit={handleSubmit}>
        <Label>Họ tên</Label>
        <Input name="fullName" value={form.fullName} onChange={handleChange} required />

        <Label>Email</Label>
        <Input name="email" value={form.email} onChange={handleChange} required />

        <Label>Mật khẩu</Label>
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <Label>Số điện thoại</Label>
        <Input name="phone" value={form.phone} onChange={handleChange} />

        <Label>Giới tính</Label>
        <Select name="gender" value={form.gender} onChange={handleChange}>
          <option value="MALE">Nam</option>
          <option value="FEMALE">Nữ</option>
          <option value="OTHER">Khác</option>
        </Select>

        <Label>Ngày sinh</Label>
        <Input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
        />

        <Label>Vai trò</Label>
        <Select name="role" value={form.role} onChange={handleChange}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
          <option value="SHOP">SHOP</option>
        </Select>

        <Label>
          <Input type="checkbox" name="status" checked={form.status} onChange={handleChange} />
          Hoạt động
        </Label>

        <Label>Ảnh đại diện</Label>
        <Input type="file" onChange={(e) => setAvatar(e.target.files[0])} />

        <Button type="submit" $variant="add">Lưu</Button>
      </Form>
    </Container>
  );
};

export default UserAdd;
