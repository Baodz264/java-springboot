import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Tạo context
export const ToastContext = createContext(null);

// Provider
export const ToastProvider = ({ children }) => {
  const notify = {
    success: (msg) => toast.success(msg),
    error: (msg) => toast.error(msg),
    info: (msg) => toast.info(msg),
    warning: (msg) => toast.warning(msg),
  };

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </ToastContext.Provider>
  );
};

// Hook custom
export const useToast = () => useContext(ToastContext);

// 👇 nếu bạn muốn import mặc định thì thêm dòng này
export default ToastProvider;
