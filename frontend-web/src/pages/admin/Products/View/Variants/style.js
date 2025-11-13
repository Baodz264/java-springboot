import styled from "styled-components";

/* Wrapper bảng biến thể */
export const VariantTableWrapper = styled.div`
  button.add-variant {
    margin-bottom: 15px;
    padding: 8px 16px;
    background-color: #2ecc71;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover { 
      background-color: #27ae60;
      transform: translateY(-2px);
    }
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  th, td {
    padding: 10px 12px;
    text-align: left;
  }

  th {
    background-color: #f8f9fa;
    color: #34495e;
    font-weight: 600;
  }

  tr {
    transition: all 0.2s ease;
  }

  tr:hover {
    background-color: #f1f8ff;
  }

  td img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid #ddd;
  }
`;

/* Action button sửa/xóa */
export const ActionButton = styled.button`
  background-color: ${(props) => props.$bg || "#3498db"};
  color: #fff;
  border: none;
  padding: 6px 12px;
  margin-right: 5px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { 
    opacity: 0.85;
    transform: translateY(-1px);
  }
`;

/* Modal */
export const ModalBackdrop = styled.div`
  position: fixed;
  top:0; left:0; right:0; bottom:0;
  background: rgba(0,0,0,0.45);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background:#fff;
  padding:25px;
  border-radius:12px;
  width: 420px;
  max-width: 90%;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  gap: 10px;

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 22px;
    color: #2c3e50;
  }
`;

/* Form group */
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;

  label { 
    font-weight: 500; 
    margin-bottom: 6px; 
    color: #34495e;
  }

  input, select {
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;
    transition: all 0.2s ease;
    &:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 4px rgba(52,152,219,0.3);
    }
  }
`;

/* Button chung */
export const Button = styled.button`
  background-color: ${(props) => props.$bg || "#3498db"};
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;
