import styled from "styled-components";

/* --------- Container --------- */
export const Container = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  margin: 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

/* --------- Header --------- */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }
`;

/* --------- Form --------- */
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/* --------- Label --------- */
export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

/* --------- Input --------- */
export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &[type="checkbox"] {
    width: auto;
    padding: 0;
    margin-right: 4px;
  }
`;

/* --------- Button --------- */
export const Button = styled.button`
  background: ${({ $danger }) => ($danger ? "#dc3545" : "#007bff")}; /* màu nền */
  color: #fff;                                                        /* chữ trắng */
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ $danger }) => ($danger ? "#c82333" : "#0056b3")};
  }
`;
export const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  resize: vertical;
  font-size: 14px;
`;