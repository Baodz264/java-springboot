import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import UserService from "../../../../services/userService";
import { useToast } from "../../../../contexts/ToastProvider";
import {
  Container,
  Header,
  Table,
  Th,
  Td,
  Button,
  Avatar,
  SearchInputWrapper,
  SearchInput
} from "./style";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const { success, error } = useToast();

  const fetchUsers = useCallback(async () => {
    try {
      const data = keyword
        ? await UserService.search(keyword)
        : await UserService.getAll();
      setUsers(data || []);
    } catch {
      error("Không thể tải danh sách người dùng");
    }
  }, [keyword, error]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        await UserService.delete(id);
        setUsers(prev => prev.filter(u => u.id !== id));
        success("Xóa người dùng thành công!");
      } catch {
        error("Lỗi khi xóa người dùng");
      }
    }
  };

  return (
    <Container>
      <Header>Danh sách người dùng</Header>

      <SearchInputWrapper>
        <SearchInput
          type="text"
          placeholder="Tìm kiếm theo tên, email, ID hoặc số điện thoại..."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && fetchUsers()}
        />
        <Button onClick={fetchUsers}>Tìm kiếm</Button>
      </SearchInputWrapper>

      <Link to="/admin/users/add">
        <Button $variant="add">+ Thêm mới</Button>
      </Link>

      <Table>
        <thead>
          <tr>
            <Th>Avatar</Th>
            <Th>ID</Th>
            <Th>Họ tên</Th>
            <Th>Email</Th>
            <Th>Số điện thoại</Th>
            <Th>Giới tính</Th>
            <Th>Ngày sinh</Th>
            <Th>Vai trò</Th>
            <Th>Trạng thái</Th>
            <Th>Hành động</Th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <Td>
                {u.avatarUrl ? (
                  <Avatar
                    src={`${process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"}${u.avatarUrl}`}
                    alt={u.fullName}
                  />
                ) : (
                  <Avatar src="/default-avatar.png" alt="avatar mặc định" />
                )}
              </Td>
              <Td>{u.id}</Td>
              <Td>{u.fullName}</Td>
              <Td>{u.email}</Td>
              <Td>{u.phone || "Không có"}</Td>
              <Td>{u.gender || "Không có"}</Td>
              <Td>{u.dateOfBirth || "Không có"}</Td>
              <Td>{u.role}</Td>
              <Td>{u.status ? "Hoạt động" : "Khóa"}</Td>
              <Td>
                <Link to={`/admin/users/view/${u.id}`}>
                  <Button>Xem</Button>
                </Link>
                <Link to={`/admin/users/edit/${u.id}`}>
                  <Button $variant="edit">Sửa</Button>
                </Link>
                <Button $variant="delete" onClick={() => handleDelete(u.id)}>
                  Xóa
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserList;
