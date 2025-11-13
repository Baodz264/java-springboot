import styled from "styled-components";

export const Main = styled.div`
  flex: 1;
  padding: 24px;
  background-color: #f3f4f6;
  min-height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const LogoutButton = styled.button`
  padding: 8px 16px;
  background-color: #ef4444;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #dc2626;
  }
`;

export const StatsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

export const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
`;

export const CardIcon = styled.div`
  background-color: ${(props) => props.$bg || "#e0f2fe"};
  color: ${(props) => props.$color || "#1d4ed8"};
  padding: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardContent = styled.div`
  margin-left: 15px;
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`;

export const CardNumber = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export const ChartSection = styled.section`
  background-color: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;
