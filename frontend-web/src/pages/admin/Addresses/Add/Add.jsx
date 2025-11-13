import React, { useState, useEffect } from "react";
import { Container, Form, Label, Input, Button } from "./style";
import AddressService from "../../../../services/addressService";
import UserService from "../../../../services/userService";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../contexts/ToastProvider";

const AddressAdd = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    district: "",
    ward: "",
    isDefault: false,
    userId: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserService.getAll();
        setUsers(data);
      } catch (err) {
        console.error("Lỗi tải danh sách người dùng:", err);
        toast.error("Không thể tải danh sách người dùng");
      }
    };
    fetchUsers();
  }, [toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddressService.create(address);
      toast.success("Thêm địa chỉ thành công");
      navigate("/admin/addresses");
    } catch (err) {
      console.error("Lỗi tạo địa chỉ:", err);
      toast.error("Thêm địa chỉ thất bại");
    }
  };

  return (
    <Container>
      <h2>Thêm địa chỉ</h2>
      <Form onSubmit={handleSubmit}>
        <Label>Họ và tên</Label>
        <Input
          value={address.fullName}
          onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
        />

        <Label>Số điện thoại</Label>
        <Input
          value={address.phone}
          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
        />

        <Label>Địa chỉ</Label>
        <Input
          value={address.addressLine}
          onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
        />

        <Label>Tỉnh/Thành phố</Label>
        <Input
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />

        <Label>Quận/Huyện</Label>
        <Input
          value={address.district}
          onChange={(e) => setAddress({ ...address, district: e.target.value })}
        />

        <Label>Phường/Xã</Label>
        <Input
          value={address.ward}
          onChange={(e) => setAddress({ ...address, ward: e.target.value })}
        />

        <Label>
          <Input
            type="checkbox"
            checked={address.isDefault}
            onChange={(e) => setAddress({ ...address, isDefault: e.target.checked })}
          />
          Đặt làm địa chỉ mặc định
        </Label>

        <Label>Người dùng</Label>
        <select
          value={address.userId}
          onChange={(e) => setAddress({ ...address, userId: e.target.value })}
        >
          <option value="">-- Chọn người dùng --</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.fullName}</option>
          ))}
        </select>

        <Button type="submit">Thêm địa chỉ</Button>
      </Form>
    </Container>
  );
};

export default AddressAdd;
