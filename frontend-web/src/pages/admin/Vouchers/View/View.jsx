import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import VoucherService from "../../../../services/voucherService";
import { useToast } from "../../../../contexts/ToastProvider";
import { 
  Container, 
  Header, 
  InfoGrid, 
  Label, 
  Value, 
  ImgPreview, 
  Button 
} from "./style";

const VoucherView = () => {
  const { id } = useParams();
  const [voucher, setVoucher] = useState(null);
  const toast = useToast();

  useEffect(() => {
    VoucherService.getById(id)
      .then((data) => setVoucher(data))
      .catch(() => toast.error("Không thể tải voucher!"));
  }, [id, toast]);

  if (!voucher) return <p>Đang tải...</p>;

  return (
    <Container>
      <Header>Chi tiết Voucher</Header>
      <InfoGrid>
        <Label>ID:</Label> <Value>{voucher.id}</Value>
        <Label>Mã:</Label> <Value>{voucher.code}</Value>
        <Label>Loại:</Label> <Value>{voucher.discountType}</Value>
        <Label>Giá trị:</Label> <Value>{voucher.discountValue}</Value>
        <Label>Đơn hàng tối thiểu:</Label> <Value>{voucher.minOrderValue}</Value>
        <Label>Giới hạn sử dụng:</Label> <Value>{voucher.usageLimit}</Value>
        <Label>Đã sử dụng:</Label> <Value>{voucher.usedCount}</Value>
        <Label>Ngày bắt đầu:</Label> <Value>{voucher.startDate}</Value>
        <Label>Ngày kết thúc:</Label> <Value>{voucher.endDate}</Value>
        <Label>Trạng thái:</Label> 
        <Value style={{ fontWeight: 600, color: voucher.status ? "#28a745" : "#dc3545" }}>
          {voucher.status ? "Hoạt động" : "Ngưng"}
        </Value>
      </InfoGrid>

      {voucher.imageUrl && (
        <ImgPreview
          src={
            voucher.imageUrl.startsWith("http")
              ? voucher.imageUrl
              : `http://localhost:8080${voucher.imageUrl}`
          }
          alt={voucher.code}
        />
      )}

      <Link to="/admin/vouchers">
        <Button $variant="default">← Quay lại</Button>
      </Link>
    </Container>
  );
};

export default VoucherView;
