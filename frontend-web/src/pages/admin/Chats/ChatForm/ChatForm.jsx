import React, { useState } from "react";
import {
  ChatFormWrapper,
  InputWrapper,
  Input,
  FileInputLabel,
  FileInput,
  SendButton,
} from "./style";
import { FiSend, FiImage } from "react-icons/fi";

const ChatForm = ({ onSend, disabled }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled) return;

    if (text.trim() || file) {
      onSend(text, file);
      setText("");
      setFile(null);
    }
  };

  return (
    <ChatFormWrapper onSubmit={handleSubmit}>
      <InputWrapper>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={disabled ? "Đang kết nối..." : "Nhập tin nhắn..."}
          disabled={disabled}
        />
        <FileInputLabel htmlFor="file-upload">
          <FiImage size={20} />
        </FileInputLabel>
        <FileInput
          id="file-upload"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          disabled={disabled}
        />
      </InputWrapper>
      <SendButton type="submit" disabled={disabled}>
        <FiSend size={20} />
      </SendButton>
    </ChatFormWrapper>
  );
};

export default ChatForm;
