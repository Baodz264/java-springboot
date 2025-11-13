import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 20px;          /* giảm từ 30px */
  max-width: 1100px;  /* nhỏ hơn để gọn */
  margin: 20px auto;  /* giảm margin */
  padding: 15px;      /* giảm padding */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const LeftPanel = styled.div`
  flex: 1;
  text-align: center;
`;

export const AvatarWrapper = styled.div`
  margin-bottom: 10px; /* giảm từ 15px */
`;

export const Avatar = styled.img`
  width: 120px;   /* nhỏ hơn 130px */
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #00bfa5;  /* mỏng hơn */
  box-shadow: 0 3px 8px rgba(0,0,0,0.08);
`;

export const UserName = styled.div`
  font-weight: 700;
  font-size: 18px; /* giữ */
  margin-bottom: 4px; /* giảm từ 6px */
`;

export const UserEmail = styled.div`
  font-size: 13px; /* nhỏ hơn */
  color: #555;
`;

export const VerifiedBadge = styled.span`
  background-color: #e6f9f3;
  color: #00bfa5;
  font-size: 11px; /* nhỏ hơn */
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 12px;
  margin-left: 5px;
`;

export const CenterPanel = styled.div`
  flex: 2;
  background-color: #fff;
  padding: 18px;      /* giảm từ 25px */
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.05);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px; /* giảm từ 20px */
`;

export const FormRow = styled.div`
  display: flex;
  gap: 10px; /* giữ */
  flex-wrap: wrap;
  align-items: center;
`;

export const FormRowInline = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: nowrap;
  align-items: center;

  @media (max-width: 650px) {
    flex-wrap: wrap;
  }
`;

export const FormLabel = styled.label`
  font-weight: 500;
  width: 80px;
`;

export const FormInput = styled.input`
  flex: 1 1 140px; /* giảm từ 160px */
  padding: 6px 10px; /* giảm padding */
  border-radius: 6px;
  border: 1px solid #ccc;
  min-width: 120px;
  max-width: 220px; /* giảm max-width */
  transition: all 0.2s;

  &:focus {
    border-color: #00bfa5;
    box-shadow: 0 0 0 2px rgba(0,191,165,0.2);
    outline: none;
  }
`;

export const FormSelect = styled.select`
  flex: 1 1 140px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  min-width: 120px;
  max-width: 220px;
  transition: all 0.2s;

  &:focus {
    border-color: #00bfa5;
    box-shadow: 0 0 0 2px rgba(0,191,165,0.2);
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  width: 140px; /* giảm từ 160px */
  padding: 10px 0; /* giảm padding */
  background: linear-gradient(90deg, #00bfa5, #007bff);
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export const RightPanel = styled.div`
  flex: 1;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MenuItem = styled.div`
  padding: 10px 14px; /* giảm padding */
  cursor: pointer;
  border-radius: 6px;
  color: #333;
  background-color: #f9f9f9;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);

  &:hover {
    background-color: #e6f9f3;
    transform: translateX(2px);
  }
`;
