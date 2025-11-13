import styled from "styled-components";

// Toàn màn hình căn giữa form
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #74ebd5, #9face6);
  font-family: "Segoe UI", sans-serif;
`;

// Hộp form chính
export const FormBox = styled.div`
  background: #fff;
  padding: 40px 50px;
  border-radius: 16px;
  width: 380px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: fadeIn 0.4s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Tiêu đề form
export const Title = styled.h2`
  margin-bottom: 25px;
  font-size: 26px;
  color: #333;
`;

// Input
export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  transition: 0.3s;

  &:focus {
    border-color: #6a5acd;
    outline: none;
    box-shadow: 0 0 4px #6a5acd;
  }
`;

// Nút bấm
export const Button = styled.button`
  width: 100%;
  padding: 12px 0;
  background: #6a5acd;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.3s;

  &:hover {
    background: #5848c2;
  }
`;

// Thông báo lỗi/thành công
export const Message = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: ${(props) => (props.error ? "#e63946" : "#2a9d8f")};
`;

// Liên kết chuyển trang
export const LinkText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: #6a5acd;
    text-decoration: underline;
  }
`;
