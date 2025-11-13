import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
`;

export const ProductSection = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 50px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: start;
`;

export const RightPanel = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProductTitle = styled.h1`
  font-size: 26px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
`;

export const Brand = styled.div`
  font-size: 15px;
  color: #777;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 16px 0;
`;

export const Description = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #444;
`;

/* ================= Review ================= */
export const ReviewSection = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 40px;
  flex-wrap: wrap;
  background: #fafafa;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const ReviewFormWrapper = styled.div`
  flex: 1; // chiếm 1 phần
  min-width: 300px;
`;

export const ReviewListWrapper = styled.div`
  flex: 2; // chiếm 2 phần
  min-width: 300px;
`;

export const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  border-left: 4px solid #ff4d4f;
  padding-left: 10px;
`;
