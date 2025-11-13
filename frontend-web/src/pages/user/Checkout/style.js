import styled from "styled-components";

// Container tổng
export const Container = styled.div`
  max-width: 1024px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f5f7;
  border-radius: 12px;

  @media(max-width: 768px){
    padding: 15px;
  }
`;

// Tiêu đề
export const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;

  @media(max-width: 768px){
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

// Địa chỉ giao hàng
export const AddressContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);

  @media(max-width: 768px){
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChangeAddressButton = styled.button`
  background: none;
  border: none;
  color: #ff3d00;
  font-weight: 600;
  cursor: pointer;
  margin-top: 5px;
`;

// Danh sách sản phẩm
export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  @media(max-width: 768px){
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  margin-right: 20px;

  @media(max-width: 768px){
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
  margin-left: 15px;

  @media(max-width: 768px){
    margin-left: 0;
    margin-top: 10px;
  }
`;

export const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  font-weight: bold;
  border-radius: 6px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Quantity = styled.input`
  width: 40px;
  text-align: center;
  margin: 0 6px;
  border-radius: 6px;
  border: 1px solid #ccc;
  height: 28px;
`;

// Voucher
export const VoucherContainer = styled.div`
  background-color: #fff;
  padding: 15px 20px;
  border-radius: 12px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
`;

export const VoucherInputContainer = styled.div`
  display: flex;
  gap: 10px;

  @media(max-width: 768px){
    flex-direction: column;
  }
`;

export const VoucherInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

export const ApplyButton = styled.button`
  padding: 12px 25px;
  background: linear-gradient(90deg,#ff6b6b,#ff3d00);
  color: #fff;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:hover{
    transform: translateY(-2px);
  }
`;

// Danh sách voucher có sẵn
export const VoucherList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const VoucherItem = styled.button`
  padding: 6px 12px;
  border: 1px solid #007bff;
  border-radius: 6px;
  font-size: 13px;
  cursor: ${({ claimed }) => (claimed ? "not-allowed" : "pointer")};
  background-color: ${({ claimed }) => (claimed ? "#f1f1f1" : "#fff")};
  color: ${({ claimed }) => (claimed ? "#999" : "#007bff")};
  text-decoration: ${({ claimed }) => (claimed ? "line-through" : "none")};

  &:hover{
    background-color: ${({ claimed }) => (claimed ? "#f1f1f1" : "#007bff")};
    color: ${({ claimed }) => (claimed ? "#999" : "#fff")};
  }
`;

// Phí vận chuyển
export const FeeContainer = styled.div`
  background-color: #fff;
  margin-top: 20px;
  padding: 15px 20px;
  border-radius: 12px;
`;

export const ShippingOption = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: #f0f0f0;
  }

  &.selected {
    background-color: #ffece6;
  }
`;

// Chi tiết thanh toán
export const Summary = styled.div`
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: 500;
`;

export const Total = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-top: 10px;
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 16px 0;
  background: linear-gradient(90deg,#ff6b6b,#ff3d00);
  color: #fff;
  border-radius: 12px;
  border: none;
  font-size: 20px;
  font-weight: 700;
  margin-top: 15px;
  cursor: pointer;

  &:hover{
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.2);
  }
`;
