import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Header,
  VoucherList,
  VoucherCard,
  VoucherImage,
  VoucherInfo,
  VoucherTitle,
  VoucherValue,
  VoucherCondition,
  VoucherExpiry,
  VoucherButton,
} from "./style";
import VoucherService from "../../../../services/voucherService";
import { useToast } from "../../../../contexts/ToastProvider";

const VouchersTab = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const BASE_URL = "http://localhost:8080";

  // 📦 Lấy danh sách voucher từ API (dùng useCallback để ổn định dependency)
  const fetchVouchers = useCallback(async () => {
    try {
      const data = await VoucherService.getAll();
      setVouchers(data);
    } catch (err) {
      console.error("❌ Lỗi khi tải voucher:", err);
      toast.error("Không thể tải danh sách voucher!");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Gọi khi component mount
  useEffect(() => {
    fetchVouchers();
  }, [fetchVouchers]);

  // 🎁 Khi người dùng nhấn "Nhận voucher"
  const handleClaim = (id) => {
    setVouchers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, claimed: true } : v))
    );
    toast.success("🎉 Đã nhận voucher thành công!");
  };

  if (loading) return <p>Đang tải danh sách voucher...</p>;

  return (
    <Container>
      <Header>🎟️ Kho Voucher của bạn</Header>

      {vouchers.length === 0 ? (
        <p>Chưa có voucher nào khả dụng.</p>
      ) : (
        <VoucherList>
          {vouchers.map((v) => {
            const isPercent = v.discountType === "PERCENT";
            const discountValue = isPercent
              ? `${v.discountValue}%`
              : `${v.discountValue?.toLocaleString()} ₫`;
            const minOrder =
              v.minOrderValue?.toLocaleString() || "Không giới hạn";
            const expiry = v.endDate
              ? `Hạn dùng: ${v.endDate}`
              : "Không xác định";

            const imageSrc = v.imageUrl
              ? v.imageUrl.startsWith("http")
                ? v.imageUrl
                : `${BASE_URL}${
                    v.imageUrl.startsWith("/") ? "" : "/"
                  }${v.imageUrl}`
              : "/default-voucher.jpg";

            return (
              <VoucherCard key={v.id} $claimed={v.claimed}>
                <VoucherImage src={imageSrc} alt={v.code} />
                <VoucherInfo>
                  <VoucherTitle>{v.code || "Voucher giảm giá"}</VoucherTitle>
                  <VoucherValue>{discountValue}</VoucherValue>
                  <VoucherCondition>
                    Áp dụng cho đơn từ {minOrder} ₫
                  </VoucherCondition>
                  <VoucherExpiry>{expiry}</VoucherExpiry>
                </VoucherInfo>

                <VoucherButton
                  disabled={v.claimed}
                  onClick={() => handleClaim(v.id)}
                >
                  {v.claimed ? "Đã nhận" : "Nhận"}
                </VoucherButton>
              </VoucherCard>
            );
          })}
        </VoucherList>
      )}
    </Container>
  );
};

export default VouchersTab;
