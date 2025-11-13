import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../../../services/userService";
import { useToast } from "../../../../contexts/ToastProvider";
import { Container, Header, Form, Label, Input, Select, Button } from "./style";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success, error } = useToast();
  const [form, setForm] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    UserService.getById(id)
      .then((data) => {
        // Chuyển dateOfBirth về định dạng yyyy-MM-dd nếu API trả về LocalDate
        if (data.dateOfBirth) {
          data.dateOfBirth = data.dateOfBirth.split("T")[0];
        }
        setForm(data);
      })
      .catch(() => error("Không thể tải thông tin user"));
  }, [id, error]);

  if (!form) return <p>Đang tải...</p>;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...form };
      if (!updatedData.password) delete updatedData.password;

      await UserService.update(id, updatedData, avatar);
      success("Cập nhật user thành công!");
      navigate("/admin/users");
    } catch {
      error("Lỗi khi cập nhật user");
    }
  };

  return (
    <Container>
      <Header>Sửa User</Header>
      <Form onSubmit={handleSubmit}>
        <Label>Họ tên</Label>
        <Input name="fullName" value={form.fullName} onChange={handleChange} />

        <Label>Email</Label>
        <Input name="email" value={form.email} onChange={handleChange} disabled />

        <Label>Mật khẩu (để trống nếu không đổi)</Label>
        <Input
          type="password"
          name="password"
          value={form.password || ""}
          onChange={handleChange}
        />

        <Label>Số điện thoại</Label>
        <Input name="phone" value={form.phone || ""} onChange={handleChange} />

        <Label>Giới tính</Label>
        <Select name="gender" value={form.gender || "OTHER"} onChange={handleChange}>
          <option value="MALE">Nam</option>
          <option value="FEMALE">Nữ</option>
          <option value="OTHER">Khác</option>
        </Select>

        <Label>Ngày sinh</Label>
        <Input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth || ""}
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
        {form.avatarUrl && (
          <img
            src={`http://localhost:8080${form.avatarUrl}`}
            alt="avatar"
            width="100"
            style={{ marginTop: "10px" }}
          />
        )}

        <Button type="submit" $variant="edit">Cập nhật</Button>
      </Form>
    </Container>
  );
};

export default UserEdit;
