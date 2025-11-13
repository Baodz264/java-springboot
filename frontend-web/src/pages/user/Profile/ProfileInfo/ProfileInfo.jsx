import React, { useState } from "react";
import {
  Form,
  FormRow,
  FormRowInline,
  FormLabel,
  FormInput,
  FormSelect,
  SubmitButton
} from "../style";
import UserService from "../../../../services/userService";
import { useToast } from "../../../../contexts/ToastProvider"; // ✅ Thêm toast

const ProfileInfo = ({ user, setUser }) => {
  const [avatarFile, setAvatarFile] = useState(null);
  const toast = useToast(); // hook toast

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { ...user };

      await UserService.update(user.id, updatedUser, avatarFile);

      setUser(updatedUser); // cập nhật state local nếu cần

      toast.success("Lưu thông tin hồ sơ thành công!"); // thông báo thành công
    } catch (err) {
      console.error("Lỗi cập nhật user:", err);
      toast.error("Cập nhật thất bại!"); // thông báo lỗi
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <FormLabel>Họ & Tên</FormLabel>
        <FormInput
          type="text"
          name="fullName"
          value={user.fullName || ""}
          onChange={handleChange}
        />
      </FormRow>

      <FormRow>
        <FormLabel>Số điện thoại</FormLabel>
        <FormInput
          type="text"
          name="phone"
          value={user.phone || ""}
          onChange={handleChange}
        />
      </FormRow>

      <FormRowInline>
        <FormLabel>Giới tính</FormLabel>
        <FormSelect
          name="gender"
          value={user.gender || ""}
          onChange={handleChange}
        >
          <option value="">Chọn giới tính</option>
          <option value="MALE">Nam</option>
          <option value="FEMALE">Nữ</option>
          <option value="OTHER">Khác</option>
        </FormSelect>

        <FormLabel>Ngày sinh</FormLabel>
        <FormInput
          type="date"
          name="dateOfBirth"
          value={user.dateOfBirth || ""}
          onChange={handleChange}
        />
      </FormRowInline>

      <FormRow>
        <FormLabel>Chọn ảnh</FormLabel>
        <FormInput type="file" onChange={handleFileChange} />
      </FormRow>

      <SubmitButton type="submit">Lưu thông tin</SubmitButton>
    </Form>
  );
};

export default ProfileInfo;
