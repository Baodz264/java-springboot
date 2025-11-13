// src/pages/admin/Payments/style.js
import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 30px auto;
  padding: 20px 25px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
`;

export const Header = styled.h2`
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 600;
  color: #333;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #444;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.15);
  }
`;

export const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  background: #fff;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.15);
  }
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
  color: #fff;

  background: ${({ variant }) =>
    variant === "edit" ? "#28a745" : // xanh lá cho Edit
    variant === "delete" ? "#dc3545" : // đỏ cho Delete
    "#007bff"}; // mặc định xanh dương cho Add

  &:hover {
    opacity: 0.9;
  }
`;
