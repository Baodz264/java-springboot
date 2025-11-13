import styled from "styled-components";

// Container tổng cho phí vận chuyển và thanh toán
export const FeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;

  h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
`;

// Option vận chuyển hoặc thanh toán
export const ShippingOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #fff;

  &.selected {
    border-color: #007bff;
    background-color: #e6f0ff;
  }

  &:hover {
    border-color: #007bff;
  }

  div {
    font-size: 14px;
    color: #333;
  }
`;
