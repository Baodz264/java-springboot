import styled from "styled-components";

/* --------- Container --------- */
export const Container = styled.div`
  background: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 12px;
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
    font-size: 22px;
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

  &[type="file"] {
    padding: 4px 0;
  }
`;

/* --------- Button --------- */
export const Button = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: ${({ $danger }) => ($danger ? "#dc3545" : "#007bff")};
  color: #fff;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ $danger }) => ($danger ? "#c82333" : "#0056b3")};
  }
`;
