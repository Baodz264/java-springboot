// src/components/Header/Header.jsx
import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/shop.jpg";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaComments,
} from "react-icons/fa";
import * as S from "./style";
import { UserContext } from "../../contexts/UserContext";
import { useToast } from "../../contexts/ToastProvider";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const toast = useToast();
  const [cartCount, setCartCount] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // --- Load cart count từ localStorage ---
  const loadCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setCartCount(count);
  };

  useEffect(() => {
    loadCartCount();
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => loadCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  // --- Đóng dropdown khi click ngoài ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Xử lý tìm kiếm ---
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = keyword.trim();

    if (!trimmed) {
      // Nếu trống -> xóa keyword, gửi event rỗng, quay Home
      localStorage.removeItem("searchKeyword");
      window.dispatchEvent(new CustomEvent("searchKeyword", { detail: "" }));
      // toast.info("Đã trở về trang ban đầu!");
      navigate("/");
      return;
    }

    // Nếu có từ khóa -> lưu localStorage, gửi event
    localStorage.setItem("searchKeyword", trimmed);
    window.dispatchEvent(new CustomEvent("searchKeyword", { detail: trimmed }));
    // toast.success(`Đang tìm kiếm: "${trimmed}"`);
  };

  const handleOpenChat = () => navigate("/chat");

  // --- Reset tìm kiếm khi click logo ---
  const handleLogoClick = () => {
    localStorage.removeItem("searchKeyword");
    window.dispatchEvent(new CustomEvent("searchKeyword", { detail: "" }));
  };

  return (
    <S.HeaderWrapper>
      {/* --- Thanh top bar --- */}
      <S.TopBar>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <S.TopBarList>
            <li>
              <FaPhone /> +021-95-51-84
            </li>
            <li>
              <FaEnvelope /> email@email.com
            </li>
            <li>
              <FaMapMarkerAlt /> 1734 Stonecoal Road
            </li>
          </S.TopBarList>

          <S.TopBarMenu ref={dropdownRef}>
            {!user ? (
              <>
                <li>
                  <Link to="/auth/login">🔑 Đăng nhập</Link>
                </li>
                <li>
                  <Link to="/auth/register">✍️ Đăng ký</Link>
                </li>
              </>
            ) : (
              <li>
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={
                      user.avatarUrl
                        ? `${
                            process.env.REACT_APP_API_BASE_URL ||
                            "http://localhost:8080"
                          }${user.avatarUrl}`
                        : "/default-avatar.png"
                    }
                    alt={user.fullName || "avatar"}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <span>{user.fullName || "Người dùng"}</span>
                </div>

                {isDropdownOpen && (
                  <S.DropdownMenu>
                    <S.DropdownItem $border>
                      <Link to="/profile">👤 Hồ sơ</Link>
                    </S.DropdownItem>
                    <S.DropdownItem
                      onClick={() => {
                        logout();
                        toast.success("Đăng xuất thành công!");
                        navigate("/auth/login");
                      }}
                    >
                      🔓 Đăng xuất
                    </S.DropdownItem>
                  </S.DropdownMenu>
                )}
              </li>
            )}
          </S.TopBarMenu>
        </div>
      </S.TopBar>

      {/* --- Header chính --- */}
      <S.MainHeader>
        <S.MainHeaderContent>
          {/* Logo */}
          <S.LogoWrapper>
            <Link to="/" onClick={handleLogoClick}>
              <img src={logo} alt="Logo" />
            </Link>
          </S.LogoWrapper>

          {/* Ô tìm kiếm */}
          <S.SearchForm onSubmit={handleSearch}>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm sản phẩm..."
            />
            <button type="submit">
              <FaSearch />
            </button>
          </S.SearchForm>

          {/* Các icon chức năng */}
          <S.IconsWrapper>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <FaHeart />
              <span>Yêu thích</span>
              <S.Badge>2</S.Badge>
            </div>

            <Link to="/cart" style={{ position: "relative" }}>
              <FaShoppingCart />
              <span>Giỏ hàng</span>
              <S.Badge>{cartCount}</S.Badge>
            </Link>

            <div
              onClick={handleOpenChat}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                cursor: "pointer",
              }}
            >
              <FaComments style={{ fontSize: "1rem", color: "#fff" }} />
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "0.6rem",
                  color: "#fff",
                }}
              >
                Chat
              </span>
            </div>
          </S.IconsWrapper>
        </S.MainHeaderContent>
      </S.MainHeader>
    </S.HeaderWrapper>
  );
};

export default Header;
