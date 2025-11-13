import styled from "styled-components";

export const UserListWrapper = styled.div`
  width: 250px;
  border-right: 1px solid #ccc;
  overflow-y: auto;
  background-color: #fff;
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#f0f0f0" : "#fff")};
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const UserName = styled.div`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserEmail = styled.div`
  font-size: 12px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


export const LastMessage = styled.div`
  font-size: 0.85rem;
  color: #666;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UnreadBadge = styled.div`
  background-color: #ff3b30;
  color: #fff;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 12px;
  margin-left: auto;
`;
