import styled from "styled-components";

// Khung tổng của phần Order Summary
export const Summary = styled.div`
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Hàng thông tin tổng: tạm tính, giảm giá, phí vận chuyển
export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
`;

// Tổng thanh toán
export const Total = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  text-align: right;
  margin-top: 8px;
`;

// Nút thanh toán
export const CheckoutButton = styled.button`
  margin-top: 12px;
  padding: 10px 16px;
  background-color: #28a745;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #218838;
  }
`;
