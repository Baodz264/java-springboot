import styled from "styled-components";

export const VariantContainer = styled.div`
  margin-top: 20px;
`;

export const SectionHeader = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const VariantGroup = styled.div`
  margin-bottom: 14px;
`;

export const VariantLabel = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  color: #222;
`;

export const VariantOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const VariantOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid
    ${({ $active }) => ($active ? "#ee4d2d" : "rgba(0, 0, 0, 0.1)")};
  border-radius: 6px;
  background-color: #fff;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  padding: 6px 10px;
  min-width: 110px;
  transition: all 0.2s ease;
  box-shadow: ${({ $active }) =>
    $active ? "0 0 0 1px rgba(238,77,45,0.2)" : "none"};

  &:hover {
    border-color: ${({ $active }) => ($active ? "#ee4d2d" : "#ffbda6")};
  }
`;

export const VariantImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  object-fit: cover;
  margin-right: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

export const VariantText = styled.span`
  font-size: 14px;
  color: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
