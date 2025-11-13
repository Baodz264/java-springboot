import api from "./api";

const AUTH_URL = "/auth";

// 🟢 Đăng nhập (tự nhận biết Admin hay User)
export const login = async (email, password) => {
  try {
    const pathname = window.location.pathname;
    const isAdmin =
      pathname.startsWith("/admin") || pathname.startsWith("/auth/admin");

    const loginUrl = isAdmin
      ? `${AUTH_URL}/admin/login`
      : `${AUTH_URL}/login`;

    const res = await api.post(loginUrl, { email, password });
    const data = res.data;

    if (data.token) {
      if (isAdmin) {
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_user", JSON.stringify(data));
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
      }
    }

    return data;
  } catch (error) {
    console.error("❌ Login Error:", error);
    throw error.response?.data || { message: "Đăng nhập thất bại!" };
  }
};

// 🟢 Đăng ký người dùng → trả về tempUserId để nhập OTP
export const register = async (fullName, email, password, phone) => {
  try {
    const res = await api.post(`${AUTH_URL}/register`, {
      fullName,
      email,
      password,
      phone,
    });
    return res.data; // { tempUserId, message }
  } catch (error) {
    console.error("❌ Register Error:", error);
    throw error.response?.data || { message: "Đăng ký thất bại!" };
  }
};

// 🟢 Xác nhận OTP → active user + trả token
export const confirmOtp = async (tempUserId, otp) => {
  try {
    const res = await api.post(`${AUTH_URL}/confirm-otp`, {
      tempUserId,
      otp,
    });
    const data = res.data;

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error("❌ Confirm OTP Error:", error);
    throw error.response?.data || { message: "OTP không hợp lệ!" };
  }
};

// 🟢 Lấy token hiện tại
export const getToken = () => {
  const pathname = window.location.pathname;
  const isAdmin =
    pathname.startsWith("/admin") || pathname.startsWith("/auth/admin");

  return isAdmin
    ? localStorage.getItem("admin_token")
    : localStorage.getItem("token");
};

// 🟢 Đăng xuất
export const logout = () => {
  const pathname = window.location.pathname;
  const isAdmin =
    pathname.startsWith("/admin") || pathname.startsWith("/auth/admin");

  if (isAdmin) {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};
