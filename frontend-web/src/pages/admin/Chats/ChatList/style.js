import styled from "styled-components";

export const MessagesWrapper = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MessageItem = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  align-self: ${(props) => (props.$isOwn ? "flex-end" : "flex-start")};
  flex-direction: ${(props) => (props.$isOwn ? "row-reverse" : "row")};
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserName = styled.div`
  font-size: 0.8rem;
  color: gray;
  margin-bottom: 2px;
  margin-left: 4px;
`;

export const MessageBubble = styled.div`
  max-width: 60%;
  padding: 10px 14px;
  border-radius: 18px;
  background: ${(props) => (props.$isOwn ? "#0084ff" : "#e4e6eb")};
  color: ${(props) => (props.$isOwn ? "white" : "black")};
  font-size: 0.95rem;
  line-height: 1.4;
  word-wrap: break-word;
  white-space: pre-wrap;
`;
