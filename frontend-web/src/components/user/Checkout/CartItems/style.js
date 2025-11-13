import styled from "styled-components";

// Container danh sách sản phẩm
export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
`;

// Item trong giỏ
export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fff;
`;

// Ảnh sản phẩm
export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
`;

// Thông tin sản phẩm (tên, giá, size/color)
export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Tên sản phẩm
export const ProductName = styled.span`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 5px;
`;

// Giá sản phẩm
export const ProductPrice = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: #e53935;
`;

// Container cho số lượng
export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

// Nút tăng/giảm số lượng
export const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

// Input số lượng
export const Quantity = styled.input`
  width: 40px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 28px;
`;

// Nút xóa sản phẩm
export const RemoveButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-left: 10px;
  position: relative;

  &:before, &:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 16px;
    height: 2px;
    background-color: #e53935;
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &:hover:before,
  &:hover:after {
    background-color: #d32f2f;
  }
`;
