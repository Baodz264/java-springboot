import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
`;

export const Card = styled.div`
  background: #fff;
  padding: 40px 30px;
  border-radius: 12px;
  width: 380px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
`;

export const Form = styled.form`
  width: 100%;
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #888;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${(props) => (props.$otp ? "12px" : "12px 12px 12px 40px")};
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 15px;
  box-sizing: border-box;
  text-align: ${(props) => (props.$otp ? "center" : "left")};
  transition: all 0.2s;
  &:focus {
    border-color: #2575fc;
    box-shadow: 0 0 8px rgba(37, 117, 252, 0.2);
  }
`;
export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #2575fc;
  color: #fff;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #1a5ed8;
  }
`;

export const ToggleText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #555;
`;

export const ToggleLink = styled.a`
  color: #2575fc;
  font-weight: 500;
  text-decoration: none;
  margin-left: 4px;
  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f;
  margin-bottom: 15px;
  font-size: 14px;
`;
