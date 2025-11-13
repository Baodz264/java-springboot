import styled from "styled-components";

// Container chính
export const Container = styled.div`
  padding: 20px 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
`;

// Header
export const Header = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
`;

// Form
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
`;

// Label
export const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  /* Cho checkbox inline với text */
  &[for*="status"] {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
`;

// Input và file
export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;

  &[type="checkbox"] {
    width: auto;
    margin: 0;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.2);
  }
`;

// Select
export const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.2);
  }
`;

// Button
export const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: ${({ $variant }) =>
    $variant === "add" ? "#198754" :
    $variant === "edit" ? "#0d6efd" :
    $variant === "delete" ? "#dc3545" :
    "#007bff"};
  transition: all 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;
