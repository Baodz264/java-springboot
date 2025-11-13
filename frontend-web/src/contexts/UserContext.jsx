import React, { createContext, useState, useEffect } from "react";
import UserService from "../services/userService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      UserService.getById(storedUser.id)
        .then((data) => setUser(data))
        .catch(() => setUser(storedUser));
    }
  }, []);

  const login = async (userData) => {
    try {
      const freshUser = await UserService.getById(userData.id);
      localStorage.setItem("user", JSON.stringify(freshUser));
      localStorage.setItem("token", userData.token); // ✅ chỉ lưu token user
      setUser(freshUser);
    } catch {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);
      setUser(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // ✅ chỉ xóa token user
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
