import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import UserService from "../../../../services/userService";
import { useToast } from "../../../../contexts/ToastProvider";
import { Container, Header, Button } from "./style";

const UserView = () => {
  const { id } = useParams();
  const { error } = useToast();
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserService.getById(id)
      .then((data) => {
        if (data.dateOfBirth) data.dateOfBirth = data.dateOfBirth.split("T")[0];
        setUser(data);
      })
      .catch(() => error("Không thể tải thông tin người dùng"));
  }, [id, error]);

  if (!user) return <p>Đang tải...</p>;

  return (
    <Container>
      <Header>Chi tiết người dùng</Header>

      {user.avatarUrl && (
        <img
          src={`http://localhost:8080${user.avatarUrl}`}
          alt="avatar"
          width="120"
          style={{ marginBottom: "15px" }}
        />
      )}

      <p><b>ID:</b> {user.id}</p>
      <p><b>Họ tên:</b> {user.fullName}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Số điện thoại:</b> {user.phone || "Không có"}</p>
      <p><b>Giới tính:</b> {user.gender || "Không có"}</p>
      <p><b>Ngày sinh:</b> {user.dateOfBirth || "Không có"}</p>
      <p><b>Vai trò:</b> {user.role}</p>
      <p><b>Trạng thái:</b> {user.status ? "Hoạt động" : "Khóa"}</p>
      <p><b>Ngày tạo:</b> {user.createdAt ? new Date(user.createdAt).toLocaleString() : "Không có"}</p>
      <p><b>Ngày cập nhật:</b> {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "Không có"}</p>
      <p><b>Lần đăng nhập cuối:</b> {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "Chưa đăng nhập"}</p>

      <Link to="/admin/users">
        <Button $variant="back">Quay lại</Button>
      </Link>
    </Container>
  );
};

export default UserView;
