import styled from "styled-components";

// Wrapper tổng
export const ChatFormWrapper = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #fff;
`;

// Wrapper input + icon file
export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
`;

// Input chat
export const Input = styled.input`
  width: 100%;
  padding: 10px 45px 10px 15px;
  border-radius: 25px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #007bff;
  }
`;

// Icon chọn file
export const FileInputLabel = styled.label`
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #007bff;
`;

// Input file ẩn
export const FileInput = styled.input`
  display: none;
`;

// Nút gửi
export const SendButton = styled.button`
  margin-left: 10px;
  padding: 10px 15px;
  border-radius: 50%;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0056b3;
  }
`;
