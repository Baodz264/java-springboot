import React, { useState, useEffect } from "react";
import {
  VoucherContainer,
  VoucherInput,
  ApplyButton,
  VoucherList,
  VoucherCard,
  VoucherTitle,
  VoucherValue,
  VoucherCondition,
  VoucherExpiry,
  VoucherButton,
} from "../style";
import VoucherService from "../../../../services/voucherService";
import { useToast } from "../../../../contexts/ToastProvider";

const VoucherSection = ({ voucher, setVoucher, setDiscount }) => {
  const [voucherList, setVoucherList] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const data = await VoucherService.getAll();
        setVoucherList(data);
      } catch (error) {
        console.error("❌ Lỗi tải voucher:", error);
        toast.error("Không thể tải danh sách voucher!");
      }
    };
    fetchVouchers();
  }, [toast]);

  const handleApplyVoucher = (v = null) => {
    const codeToCheck = v?.code || voucher.trim();
    const found = voucherList.find(
      (vc) => vc.code?.toUpperCase() === codeToCheck.toUpperCase()
    );

    if (!found) {
      setDiscount(0);
      toast.error("Voucher không hợp lệ hoặc đã hết hạn!");
      return;
    }

    let discountValue = 0;
    if (found.discountType === "PERCENT") {
      discountValue = found.discountValue / 100; // 0.1 = 10%
    } else if (found.discountType === "AMOUNT") {
      discountValue = found.discountValue; // tiền cố định
    }

    setVoucher(found.code);
    setDiscount(discountValue);
    toast.success(`Áp dụng voucher "${found.code}" thành công!`);
  };

  const handleSelectVoucher = (v) => {
    if (v.claimed) {
      toast.info("Bạn đã nhận voucher này trước đó.");
      return;
    }
    handleApplyVoucher(v);
  };

  return (
    <VoucherContainer>
      <div style={{ marginBottom: "10px" }}>
        <VoucherInput
          placeholder="Nhập mã voucher"
          value={voucher}
          onChange={(e) => setVoucher(e.target.value)}
        />
        <ApplyButton onClick={() => handleApplyVoucher()}>Áp dụng</ApplyButton>
      </div>

      <VoucherList>
        {voucherList.length === 0 && <p>Chưa có voucher nào khả dụng.</p>}
        {voucherList.map((v) => {
          const isPercent = v.discountType === "PERCENT";
          const discountValue = isPercent
            ? `${v.discountValue}%`
            : `${v.discountValue?.toLocaleString()} ₫`;
          const minOrder = v.minOrderValue?.toLocaleString() || "Không giới hạn";
          const expiry = v.endDate ? `Hạn dùng: ${v.endDate}` : "Không xác định";

          return (
            <VoucherCard
              key={v.id}
              $claimed={v.claimed}
              onClick={() => handleSelectVoucher(v)}
            >
              <VoucherTitle>{v.code}</VoucherTitle>
              <VoucherValue>{discountValue}</VoucherValue>
              <VoucherCondition>Áp dụng cho đơn từ {minOrder} ₫</VoucherCondition>
              <VoucherExpiry>{expiry}</VoucherExpiry>
              <VoucherButton disabled={v.claimed}>
                {v.claimed ? "Đã nhận" : "Chọn"}
              </VoucherButton>
            </VoucherCard>
          );
        })}
      </VoucherList>
    </VoucherContainer>
  );
};

export default VoucherSection;
