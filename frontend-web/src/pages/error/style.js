import styled, { keyframes } from 'styled-components';

// Animation nhỏ cho icon
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% { transform: translateY(-15px);}
  60% { transform: translateY(-8px);}
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9fafb;
  text-align: center;
  padding: 24px;
`;

export const IconWrapper = styled.div`
  background-color: #fee2e2;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

export const Icon = styled.span`
  font-size: 50px;
  animation: ${bounce} 2s infinite;
`;

export const Code = styled.h1`
  font-size: 72px;
  font-weight: bold;
  color: #111827;
  margin: 0;
`;

export const Message = styled.p`
  font-size: 20px;
  color: #6b7280;
  margin: 16px 0 32px 0;
`;

export const Button = styled.button`
  padding: 12px 28px;
  background-color: #3b82f6;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;
