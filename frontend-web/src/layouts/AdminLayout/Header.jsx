import React, { useEffect, useState } from "react";
import { HeaderContainer, UserMenu } from "./style";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin_user");
    const storedUser = localStorage.getItem("user");
    const current = storedAdmin || storedUser;
    if (current) setUser(JSON.parse(current));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/admin/login");
  };

  return (
    <HeaderContainer>
      <div className="left">
        <button className="menu-btn" onClick={onToggleSidebar}>
          <FaBars />
        </button>
        <input type="text" placeholder="Search..." className="search-input" />
      </div>

      <UserMenu>
        <img
          src={
            user?.avatarUrl
              ? user.avatarUrl.startsWith("http")
                ? user.avatarUrl
                : `http://localhost:8080${user.avatarUrl}` // 🟢 Thêm base URL cho đường dẫn tương đối
              : "https://i.pravatar.cc/40"
          }
          alt="avatar"
          className="avatar"
        />
        <span className="username">{user?.fullName || "Admin"}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </UserMenu>
    </HeaderContainer>
  );
};

export default Header;
