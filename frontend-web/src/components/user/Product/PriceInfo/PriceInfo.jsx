import React from "react";
import { PriceContainer, CurrentPrice } from "./style";

const PriceInfo = ({ price = 0, quantity = 1 }) => {
  const total = price * quantity;

  return (
    <PriceContainer>
      <CurrentPrice>{total.toLocaleString("vi-VN")}₫</CurrentPrice>
    </PriceContainer>
  );
};

export default PriceInfo;
