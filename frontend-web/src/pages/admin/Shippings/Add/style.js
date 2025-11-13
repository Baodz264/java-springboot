import styled from "styled-components";

/* --------- Container --------- */
export const Container = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  margin: 20px auto;
  max-width: 600px;
`;

/* --------- Header --------- */
export const Header = styled.div`
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
`;

/* --------- Label --------- */
export const Label = styled.label`
  margin: 10px 0 6px;
  font-size: 14px;
  font-weight: 500;
`;

/* --------- Input --------- */
export const Input = styled.input`
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 12px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

/* --------- Select --------- */
export const Select = styled.select`
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 12px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

/* --------- Button (link style có gạch chân) --------- */
export const Button = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-start; /* căn nút về bên trái */
  padding: 4px 0;
  margin-top: 10px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: #0056b3;
  }
`;
