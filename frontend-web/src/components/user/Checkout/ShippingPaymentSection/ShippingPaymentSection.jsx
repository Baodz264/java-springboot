import React from "react";
import { FeeContainer, ShippingOption } from "./style";

export default function ShippingPaymentSection({
  shippingOptions,
  selectedShipping,
  setSelectedShipping,
  paymentMethods,
  selectedPayment,
  setSelectedPayment,
}) {
  return (
    <FeeContainer>
      <h4>Chọn phương thức vận chuyển</h4>
      {shippingOptions.map(option => (
        <ShippingOption
          key={option.id}
          className={selectedShipping.id === option.id ? "selected" : ""}
          onClick={() => setSelectedShipping(option)}
        >
          <div>{option.name}</div>
          <div>{option.fee.toLocaleString()}₫</div>
        </ShippingOption>
      ))}

      <h4>Chọn phương thức thanh toán</h4>
      {paymentMethods.map(method => (
        <ShippingOption
          key={method.id}
          className={selectedPayment === method.id ? "selected" : ""}
          onClick={() => setSelectedPayment(method.id)}
        >
          {method.name}
        </ShippingOption>
      ))}
    </FeeContainer>
  );
}
