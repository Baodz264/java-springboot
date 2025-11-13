import styled from "styled-components";
import { FiTrash2 } from "react-icons/fi";

// Container tổng
export const Container = styled.div`
  max-width: 1024px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 15px;
`;

// Tiêu đề
export const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  color: #222;
  margin-bottom: 30px;
`;

// Danh sách sản phẩm
export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Card sản phẩm
export const ProductItem = styled.div`
  display: flex;
  background-color: #fff;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  @media(max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ProductImage = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 20px;

  @media(max-width: 600px) {
    margin-bottom: 10px;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const ProductName = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 6px;
`;

export const ProductPrice = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #ff3d00;
`;

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e0e0e0;
    transform: scale(1.1);
  }
`;

export const Quantity = styled.input`
  width: 50px;
  margin: 0 6px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  padding: 4px;
`;

export const RemoveButton = styled(FiTrash2)`
  font-size: 22px;
  color: #ff6b6b;
  cursor: pointer;
  margin-left: 10px;
  transition: all 0.2s;

  &:hover {
    color: #ff3d00;
    transform: scale(1.2);
  }
`;

// Voucher
export const VoucherContainer = styled.div`
  margin-top: 25px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const VoucherInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

export const ApplyButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(90deg, #ff6b6b, #ff3d00);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
`;

// Phí vận chuyển
export const FeeContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
`;

// Tổng thanh toán
export const Summary = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const Total = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #222;
`;

export const CheckoutButton = styled.button`
  padding: 14px 30px;
  background: linear-gradient(90deg, #ff6b6b, #ff3d00);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.2);
  }
`;
// Danh sách voucher
export const VoucherList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
`;

// Voucher card
export const VoucherCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: ${(props) => (props.$claimed ? "#f0f0f0" : "#fff")};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$claimed ? "#f0f0f0" : "#fafafa")};
  }

  @media(max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Ảnh voucher
export const VoucherImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;

  @media(max-width: 600px) {
    margin-bottom: 10px;
    margin-right: 0;
  }
`;

// Thông tin voucher
export const VoucherTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const VoucherValue = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: #ff3d00;
  margin-bottom: 4px;
`;

export const VoucherCondition = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 2px;
`;

export const VoucherExpiry = styled.div`
  font-size: 0.8rem;
  color: #999;
`;

// Nút nhận voucher
export const VoucherButton = styled.button`
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  background-color: #00b894;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #019875;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;



