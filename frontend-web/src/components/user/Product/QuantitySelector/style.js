import styled from "styled-components";

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
`;

export const Label = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #222;
`;

export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
`;

export const Button = styled.button`
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: #111;
    color: #fff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f3f3f3;
    color: #999;
  }

  svg {
    pointer-events: none;
  }
`;

export const QuantityDisplay = styled.div`
  min-width: 48px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #111;
  background: #fff;
  padding: 0 4px;
`;
