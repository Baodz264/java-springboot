// src/pages/admin/Vouchers/Add.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VoucherService from "../../../../services/voucherService";
import { useToast } from "../../../../contexts/ToastProvider";
import { Container, Header, Form, Label, Input, Button, Select } from "./style";

const VoucherAdd = () => {
  const [voucher, setVoucher] = useState({
    code: "",
    discountType: "PERCENT",
    discountValue: 0,
    minOrderValue: 0,
    usageLimit: 0,
    startDate: "",
    endDate: "",
    status: true, // ✅ thêm status mặc định
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Nếu field là status → convert về boolean
    if (name === "status") {
      setVoucher({ ...voucher, [name]: value === "true" });
    } else {
      setVoucher({ ...voucher, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await VoucherService.create(voucher, image);
      toast.success("Thêm voucher thành công!");
      navigate("/admin/vouchers");
    } catch {
      toast.error("Thêm voucher thất bại!");
    }
  };

  return (
    <Container>
      <Header>Thêm Voucher</Header>
      <Form onSubmit={handleSubmit}>
        <Label>Mã Voucher</Label>
        <Input name="code" value={voucher.code} onChange={handleChange} required />

        <Label>Loại giảm giá</Label>
        <Select name="discountType" value={voucher.discountType} onChange={handleChange}>
          <option value="PERCENT">Phần trăm</option>
          <option value="FIXED">Số tiền cố định</option>
        </Select>

        <Label>Giá trị giảm</Label>
        <Input
          type="number"
          name="discountValue"
          value={voucher.discountValue}
          onChange={handleChange}
        />

        <Label>Đơn hàng tối thiểu</Label>
        <Input
          type="number"
          name="minOrderValue"
          value={voucher.minOrderValue}
          onChange={handleChange}
        />

        <Label>Giới hạn sử dụng</Label>
        <Input
          type="number"
          name="usageLimit"
          value={voucher.usageLimit}
          onChange={handleChange}
        />

        <Label>Ngày bắt đầu</Label>
        <Input
          type="date"
          name="startDate"
          value={voucher.startDate}
          onChange={handleChange}
        />

        <Label>Ngày kết thúc</Label>
        <Input
          type="date"
          name="endDate"
          value={voucher.endDate}
          onChange={handleChange}
        />

        <Label>Trạng thái</Label>
        <Select name="status" value={voucher.status} onChange={handleChange}>
          <option value="true">Hoạt động</option>
          <option value="false">Ngừng</option>
        </Select>

        <Label>Ảnh Voucher</Label>
        <Input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <Button type="submit" $variant="add">
          Lưu
        </Button>
      </Form>
    </Container>
  );
};

export default VoucherAdd;
