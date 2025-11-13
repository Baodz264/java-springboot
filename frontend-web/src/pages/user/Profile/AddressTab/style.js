import styled from "styled-components";

// --- Layout chính ---
export const Container = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
`;

export const Header = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #222;
  margin-bottom: 24px;
  text-align: left;
`;

// --- Danh sách địa chỉ ---
export const AddressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AddressItem = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 20px;
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 10px;
  transition: all 0.2s ease;

  &:hover {
    background: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }

  .badge-top {
    position: absolute;
    top: 10px;
    right: 16px;
  }
`;

export const AddressInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const AddressActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 👈 giúp canh xuống dưới */
  align-items: flex-end;
  gap: 8px;
  margin-left: 16px;
`;


export const DefaultBadge = styled.span`
  background: #fff2ee;
  color: #ee4d2d;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid #ee4d2d;
  font-weight: 500;
`;

// --- Nút chung ---
export const Button = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
  color: #fff;

  ${({ $variant }) =>
    $variant === "add"
      ? `
        background: #ee4d2d;
        &:hover { background: #d63e21; }
      `
      : $variant === "edit"
      ? `
        background: #007bff;
        &:hover { background: #0066cc; }
      `
      : $variant === "delete"
      ? `
        background: #dc3545;
        &:hover { background: #b52a36; }
      `
      : $variant === "cancel"
      ? `
        background: #aaa;
        &:hover { background: #888; }
      `
      : `
        background: #555;
        &:hover { background: #333; }
      `}
`;

// --- Modal Overlay + nội dung ---
export const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: #222;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
`;

export const ModalBody = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

// --- Form ---
export const Form = styled.form`
  width: 420px;
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #444;
  margin-bottom: 6px;
`;

export const FormInput = styled.input`
  padding: ${({ type }) => (type === "checkbox" ? "4px" : "10px 12px")};
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  &:focus {
    border-color: #ee4d2d;
    outline: none;
    box-shadow: 0 0 0 2px rgba(238, 77, 45, 0.15);
  }
`;
