// src/pages/admin/Addresses/List.jsx
import React, { useEffect, useState, useCallback } from "react";
import AddressService from "../../../../services/addressService";
import UserService from "../../../../services/userService";
import { Container, Table, Button, SearchInput } from "./style";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../contexts/ToastProvider";

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  // Lấy danh sách user và tạo map { id: fullName }
  const fetchUsers = useCallback(async () => {
    try {
      const users = await UserService.getAll();
      const map = {};
      users.forEach(u => (map[u.id] = u.fullName));
      setUsersMap(map);
    } catch (err) {
      console.error("Lỗi load users:", err);
      toast.error("Không thể load danh sách user");
    }
  }, [toast]);

  // Lấy tất cả địa chỉ
  const fetchAddresses = useCallback(async () => {
    try {
      const data = await AddressService.getAll();
      setAddresses(data || []);
    } catch (err) {
      console.error("Lỗi load addresses:", err);
      toast.error("Không thể load danh sách địa chỉ");
    }
  }, [toast]);

  // Tìm kiếm địa chỉ theo từ khóa
  const handleSearch = async () => {
    if (!searchKeyword) {
      fetchAddresses();
      return;
    }
    try {
      const data = await AddressService.search(searchKeyword);
      setAddresses(data || []);
    } catch (err) {
      console.error("Lỗi tìm kiếm địa chỉ:", err);
      toast.error("Tìm kiếm thất bại");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAddresses();
  }, [fetchUsers, fetchAddresses]);

  // Xóa địa chỉ
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa địa chỉ này?")) {
      try {
        await AddressService.delete(id);
        toast.success("Xóa địa chỉ thành công");
        fetchAddresses();
      } catch (err) {
        console.error("Lỗi xóa địa chỉ:", err);
        toast.error("Xóa địa chỉ thất bại");
      }
    }
  };

  return (
    <Container>
      <h2>Danh sách địa chỉ</h2>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
        <SearchInput
          type="text"
          placeholder="Tìm kiếm địa chỉ..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={() => navigate("/admin/addresses/add")}>Thêm địa chỉ</Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ & Tên</th>
            <th>Điện thoại</th>
            <th>Địa chỉ</th>
            <th>Tỉnh/Thành phố</th>
            <th>Quận/Huyện</th>
            <th>Phường/Xã</th>
            <th>Mặc định</th>
            <th>User</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.fullName}</td>
              <td>{a.phone}</td>
              <td>{a.addressLine}</td>
              <td>{a.city}</td>
              <td>{a.district}</td>
              <td>{a.ward}</td>
              <td>{a.isDefault ? "Yes" : "No"}</td>
              <td>{usersMap[a.userId] ?? "N/A"}</td>
              <td>
                <Button className="edit" onClick={() => navigate(`/admin/addresses/edit/${a.id}`)}>Sửa</Button>
                <Button className="delete" onClick={() => handleDelete(a.id)}>Xóa</Button>
                <Button className="view" onClick={() => navigate(`/admin/addresses/view/${a.id}`)}>Xem</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AddressList;
