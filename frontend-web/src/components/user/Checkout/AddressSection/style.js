import styled from "styled-components";

/* ===== Container chính của khu vực địa chỉ ===== */
export const AddressContainer = styled.div`
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 24px;
  background: #fff;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
`;

/* ===== Tiêu đề và nút Thêm/Sửa ở góc phải ===== */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const TopButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const SmallButton = styled.button`
  background: ${(p) => (p.$variant === "add" ? "#43a047" : "#1e88e5")};
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;

/* ===== Hiển thị thông tin địa chỉ ===== */
export const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
`;

/* ===== Nút chọn địa chỉ khác ===== */
export const ChangeAddressButton = styled.div`
  margin-top: 12px;
  cursor: pointer;
  color: #007bff;
  font-weight: 500;
  position: relative;

  &:hover {
    text-decoration: underline;
  }

  &:hover > ul {
    display: block;
  }
`;

/* ===== Danh sách địa chỉ khi hover ===== */
export const AddressList = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-top: 4px;
  padding: 8px 0;
  z-index: 10;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  list-style: none;
`;

/* ===== Item từng địa chỉ ===== */
export const AddressItem = styled.li`
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ selected }) => (selected ? "#f0f8ff" : "transparent")};
  transition: 0.25s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

/* ===== Badge “Mặc định” ===== */
export const DefaultBadge = styled.span`
  background-color: #28a745;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 12px;
  margin-left: 6px;
`;

/* ===== Nút hành động ===== */
export const ActionButtons = styled.div`
  display: flex;
  gap: 6px;
`;

export const Button = styled.button`
  background: ${(p) =>
    p.$variant === "edit"
      ? "#1e88e5"
      : p.$variant === "cancel"
      ? "#9e9e9e"
      : "#43a047"};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;

/* ===== Modal form thêm/sửa địa chỉ ===== */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div`
  background: #fff;
  padding: 28px;
  border-radius: 14px;
  width: 460px;
  max-width: 90%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.25s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const ModalTitle = styled.h4`
  margin-bottom: 18px;
  font-size: 18px;
  font-weight: 600;
  color: #222;
  text-align: center;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Input = styled.input`
  padding: 11px 4px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  width: 100%;
  transition: 0.2s;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

export const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #444;
  margin-top: 8px;
  input {
    accent-color: #007bff;
    transform: scale(1.1);
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 22px;
`;
