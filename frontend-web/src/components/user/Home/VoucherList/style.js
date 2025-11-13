import styled from "styled-components";

// Grid voucher
export const VoucherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

// Card voucher
export const VoucherCard = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }
`;

// Ảnh voucher
export const VoucherImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

// Thông tin voucher
export const VoucherInfo = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// Code voucher
export const VoucherCode = styled.div`
  font-weight: 700;
  font-size: 0.95rem;
  color: #333;
`;

// Giá trị voucher
export const VoucherValue = styled.div`
  font-weight: 600;
  color: #ff4500;
  font-size: 0.9rem;
`;

// Ngày hiệu lực
export const VoucherDate = styled.div`
  font-size: 0.75rem;
  color: #777;
`;
