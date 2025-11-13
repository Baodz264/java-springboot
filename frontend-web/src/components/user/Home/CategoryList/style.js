import styled from "styled-components";

// Tiêu đề section
export const SectionTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
  padding-left: 10px;
`;

// Grid chứa các category
export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  padding: 10px;
`;

// Card từng category
export const CategoryCardWrapper = styled.div`
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }
`;

// Ảnh category
export const CategoryImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CategoryCardWrapper}:hover & {
    transform: scale(1.05);
  }
`;

// Tên category
export const CategoryName = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  padding: 8px 5px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
