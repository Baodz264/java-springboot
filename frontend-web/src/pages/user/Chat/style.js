import styled, { css } from "styled-components";

// ====== Layout tổng ======
export const Container = styled.div`
  display: flex;
  height: calc(100vh - 100px);
  max-width: 1000px;
  margin: 20px auto;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

// ====== Danh sách người dùng ======
export const UserListWrapper = styled.div`
  width: 220px;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  overflow-y: auto;
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 10px;
  cursor: pointer;
  border-bottom: 1px solid #f3f4f6;
  background: ${({ selected }) => (selected ? "#eef4ff" : "#fff")};
  transition: 0.2s;

  &:hover {
    background: #f5f8ff;
  }
`;

export const UserAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
  border: 1px solid #e5e7eb;
`;

export const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-weight: 600;
  color: #1f2937;
  font-size: 13px;
`;

export const LastMessage = styled.span`
  font-size: 11px;
  color: #6b7280;
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UnreadBadge = styled.div`
  background: #3b82f6;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  border-radius: 999px;
  padding: 2px 6px;
`;

// ====== Khu vực chat chính ======
export const ChatWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f3f4f6;
`;

// ====== Danh sách tin nhắn ======
export const MessagesWrapper = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const MessageItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;

  ${({ $isOwn }) =>
    $isOwn &&
    css`
      flex-direction: row-reverse;
    `}
`;

export const AvatarWrapper = styled.div`
  margin: 0 6px;
`;

export const MessageBubble = styled.div`
  background: ${({ $isOwn }) => ($isOwn ? "#3b82f6" : "#fff")};
  color: ${({ $isOwn }) => ($isOwn ? "#fff" : "#111827")};
  padding: 7px 10px;
  border-radius: 10px;
  max-width: 65%;
  font-size: 13px;
  line-height: 1.4;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  img {
    margin-top: 6px;
    border-radius: 8px;
    max-width: 160px;
  }

  ${({ $isOwn }) =>
    $isOwn
      ? css`
          border-bottom-right-radius: 4px;
        `
      : css`
          border-bottom-left-radius: 4px;
        `}
`;

// ====== Form nhập tin nhắn ======
export const ChatFormWrapper = styled.form`
  display: flex;
  padding: 8px 12px;
  background: #fff;
  border-top: 1px solid #e5e7eb;
  align-items: center;
  gap: 8px;
`;

export const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 4px 10px;
  transition: 0.2s;

  &:focus-within {
    border-color: #3b82f6;
    background: #fff;
  }
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  color: #111827;
  padding: 4px 6px;
`;

export const FileInputLabel = styled.label`
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: #2563eb;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const SendButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;
