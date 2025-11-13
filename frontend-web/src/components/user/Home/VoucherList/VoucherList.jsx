import React, { useEffect, useState } from "react";
import VoucherService from "../../../services/voucherService";
import {
  VoucherGrid,
  VoucherCard,
  VoucherImage,
  VoucherInfo,
  VoucherCode,
  VoucherValue,
  VoucherDate,
} from "./style";

const VoucherList = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const data = await VoucherService.getAll();
        setVouchers(data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };
    fetchVouchers();
  }, []);

  if (!vouchers.length) return <p>Không có voucher nào</p>;

  return (
    <VoucherGrid>
      {vouchers.map((v) => {
        let imageUrl = v.imageUrl || "/images/default-voucher.png";
        if (imageUrl && !imageUrl.startsWith("http")) {
          imageUrl = `http://localhost:8080${imageUrl}`;
        }

        return (
          <VoucherCard key={v.id}>
            <VoucherImage
              src={imageUrl}
              alt={v.code}
              onError={(e) => (e.target.src = "/images/default-voucher.png")}
            />
            <VoucherInfo>
              <VoucherCode>{v.code}</VoucherCode>
              <VoucherValue>
                {v.discountType === "PERCENT"
                  ? `${v.discountValue}% OFF`
                  : `${v.discountValue.toLocaleString()}₫ OFF`}
              </VoucherValue>
              <VoucherDate>
                {v.startDate} → {v.endDate}
              </VoucherDate>
            </VoucherInfo>
          </VoucherCard>
        );
      })}
    </VoucherGrid>
  );
};

export default VoucherList;
