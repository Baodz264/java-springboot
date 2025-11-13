import React from "react";
import { FeeContainer, Summary, Total, CheckoutButton } from "../style";

const SummarySection = ({
  subtotal = 0,
  shippingFee = 0,
  discount = 0,
  total = 0,
  onCheckout,
}) => (
  <>
    <FeeContainer>
      <div>Tạm tính:</div>
      <div>{(subtotal || 0).toLocaleString()}₫</div>
    </FeeContainer>

    <FeeContainer>
      <div>Phí vận chuyển:</div>
      <div>{(shippingFee || 0).toLocaleString()}₫</div>
    </FeeContainer>

    <FeeContainer>
      <div>Giảm giá:</div>
      <div>{(discount || 0).toLocaleString()}₫</div>
    </FeeContainer>

    <Summary>
      <Total>Tổng thanh toán: {(total || 0).toLocaleString()}₫</Total>
      <CheckoutButton onClick={onCheckout}>Mua ngay</CheckoutButton>
    </Summary>
  </>
);

export default SummarySection;
