// src/pages/admin/Addresses/Edit/style.js
import styled from "styled-components";

// Container chính
export const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

// Form
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// Label
export const Label = styled.label`
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
`;

// Input text và checkbox
export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  
  &[type="checkbox"] {
    width: auto;
    margin-right: 8px;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.2);
  }
`;

// Button
export const Button = styled.button`
  padding: 12px;
  background-color: #28a745;
  color: #fff;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #218838;
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
