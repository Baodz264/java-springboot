import styled from "styled-components";

/* ===== CONTAINER CHUNG ===== */
export const Container = styled.div`
  background: #f5f5f5;
  padding: 24px;
  min-height: 100vh;
`;

/* ===== TIÊU ĐỀ CHÍNH ===== */
export const Header = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #222;
  margin-bottom: 24px;
  text-align: left;
`;

/* ===== CARD ĐƠN HÀNG ===== */
export const OrderCard = styled.div`
  background: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #eee;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  transition: all 0.25s ease;

  &:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  }
`;

/* ===== HEADER CỦA ĐƠN ===== */
export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f2f2f2;
  background: #fafafa;
  flex-wrap: wrap;
  gap: 8px;
`;

export const OrderInfo = styled.div`
  font-size: 14px;
  color: #444;
  line-height: 1.4;

  strong {
    font-size: 15px;
    color: #222;
  }

  span {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #777;
    margin-top: 2px;
  }
`;

export const OrderStatus = styled.div`
  color: ${({ $status }) =>
    $status === "CANCELLED"
      ? "#888"
      : $status === "DELIVERED"
      ? "#28a745"
      : "#ee4d2d"};
  font-weight: 600;
  font-size: 14px;
  text-transform: capitalize;
`;

export const OrderTotal = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  color: #ee4d2d;
  font-weight: 600;
`;

export const ViewButton = styled.button`
  border: 1px solid #ddd;
  background: #fff;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 13px;
  color: #555;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }

  svg {
    color: #666;
  }
`;

/* ===== PHẦN CHI TIẾT ===== */
export const DetailSection = styled.div`
  background: #fff;
  padding: 16px 18px 20px;
`;

/* ===== DANH SÁCH SẢN PHẨM ===== */
export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
`;

export const ProductItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #f2f2f2;
  transition: background 0.2s ease;

  &:hover {
    background: #fffaf8;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border: 1px solid #eee;
  border-radius: 6px;
  object-fit: cover;
  margin-right: 14px;
`;

export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProductName = styled.div`
  font-size: 15px;
  color: #222;
  font-weight: 500;
`;

export const ProductVariant = styled.div`
  font-size: 13px;
  color: #888;
`;

export const Quantity = styled.div`
  font-size: 13px;
  color: #777;
  min-width: 60px;
  text-align: right;
`;

export const ProductPrice = styled.div`
  font-size: 15px;
  color: #333;
  min-width: 100px;
  text-align: right;
`;

/* ===== ĐƯỜNG PHÂN CÁCH ===== */
export const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 10px 0 16px;
`;

/* ===== TRẠNG THÁI RỖNG / LOADING ===== */
export const EmptyState = styled.div`
  text-align: center;
  color: #888;
  margin-top: 50px;
  font-size: 15px;
`;

export const LoadingState = styled.div`
  text-align: center;
  color: #666;
  padding: 24px;
  font-style: italic;
  font-size: 15px;
`;
