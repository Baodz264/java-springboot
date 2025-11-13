import styled from "styled-components";

/* Layout tổng thể */
export const Container = styled.div`
  display: flex;
  gap: 30px;
  padding: 40px 60px;
  background: #fafafa;
  min-height: 100vh;

  @media (max-width: 992px) {
    flex-direction: column;
    padding: 30px 20px;
  }
`;

/* Sidebar */
export const Sidebar = styled.div`
  flex: 0 0 260px;
  background: #fff;
  border-radius: 14px;
  padding: 25px 20px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
  height: fit-content;
  position: sticky;
  top: 20px;
`;

export const Header = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #222;
  text-align: center;
  margin-bottom: 25px;
`;

export const FilterSection = styled.div`
  margin-bottom: 20px;
`;

export const FilterTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

export const FilterInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;

  &:focus {
    border-color: #ff3b30;
  }
`;

export const FilterSelect = styled.select`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #ff3b30;
  }
`;

export const RatingOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.9rem;
    color: #444;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;

    input {
      accent-color: #ff3b30;
      margin-right: 4px;
    }
  }
`;

export const RatingStar = styled.span`
  color: #ffb400;
  font-size: 0.9rem;
`;

export const FilterButton = styled.button`
  width: 100%;
  padding: 10px 0;
  border: none;
  border-radius: 10px;
  background: #ff3b30;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

/* MainContent */
export const MainContent = styled.div`
  flex: 1;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 25px;
`;

/* Card sản phẩm */
export const Card = styled.div`
  position: relative;
  border: 1px solid #eee;
  border-radius: 12px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  background-color: #f8f8f8;
  border-radius: 12px 12px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Info = styled.div`
  padding: 12px 15px;
`;

export const Name = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
  line-height: 1.4;
  height: 2.8em;
  overflow: hidden;
`;

export const PriceBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SalePrice = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111;
`;

export const OriginalPrice = styled.span`
  font-size: 0.9rem;
  color: #888;
  text-decoration: line-through;
`;

export const Badge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #e53935;
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  padding: 10px 15px 15px;
`;

export const Button = styled.button`
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  background: ${({ $primary }) => ($primary ? "#111" : "#eee")};
  color: ${({ $primary }) => ($primary ? "#fff" : "#333")};
  transition: all 0.25s ease;

  &:hover {
    opacity: 0.9;
  }
`;
export const Price = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111;
`;

