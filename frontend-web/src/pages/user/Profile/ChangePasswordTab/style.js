import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 450px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
`;

export const Header = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 25px;
  text-align: center;
  color: #333;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #555;
`;

export const FormInput = styled.input`
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: 0.2s;

  &:focus {
    outline: none;
    border-color: #ff6f00;
    box-shadow: 0 0 0 2px rgba(255, 111, 0, 0.2);
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 0;
  background-color: #ff6f00;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const LinkButton = styled.button`
  margin-top: 8px;
  background: none;
  border: none;
  color: #2196f3;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
  align-self: flex-end;
  transition: 0.2s;

  &:hover {
    color: #0b7dda;
  }
`;
