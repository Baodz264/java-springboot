// src/pages/admin/Vouchers/Edit.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VoucherService from "../../../../services/voucherService";
import { useToast } from "../../../../contexts/ToastProvider";
import { Container, Header, Form, Label, Input, Button, Select } from "./style";

const VoucherEdit = () => {
  const { id } = useParams();
  const [voucher, setVoucher] = useState({
    code: "",
    discountType: "PERCENT",
    discountValue: "",
    minOrderValue: "",
    usageLimit: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
    status: true, // ✅ thêm status
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    VoucherService.getById(id)
      .then((data) =>
        setVoucher({
          code: data.code ?? "",
          discountType: data.discountType ?? "PERCENT",
          discountValue: data.discountValue ?? "",
          minOrderValue: data.minOrderValue ?? "",
          usageLimit: data.usageLimit ?? "",
          startDate: data.startDate ?? "",
          endDate: data.endDate ?? "",
          imageUrl: data.imageUrl ?? "",
          status: data.status ?? true, // ✅ map status
        })
      )
      .catch(() => toast.error("Không thể tải voucher!"));
  }, [id, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "status") {
      setVoucher({ ...voucher, [name]: value === "true" });
    } else {
      setVoucher({ ...voucher, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await VoucherService.update(id, voucher, image);
      toast.success("Cập nhật voucher thành công!");
      navigate("/admin/vouchers");
    } catch {
      toast.error("Cập nhật voucher thất bại!");
    }
  };

  return (
    <Container>
      <Header>Sửa Voucher</Header>
      <Form onSubmit={handleSubmit}>
        <Label>Mã Voucher</Label>
        <Input
          name="code"
          value={voucher.code}
          onChange={handleChange}
          required
        />

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

        {voucher.imageUrl && (
          <img
            src={`http://localhost:8080${voucher.imageUrl}`}
            alt={voucher.code}
            width="120"
            style={{ marginTop: "10px", borderRadius: "6px" }}
          />
        )}

        <Button type="submit" $variant="edit">
          Cập nhật
        </Button>
      </Form>
    </Container>
  );
};

export default VoucherEdit;
