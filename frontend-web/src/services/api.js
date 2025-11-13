import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

// 🧩 Request Interceptor
api.interceptors.request.use(
  (config) => {
    let token;

    // Nếu API gọi vào admin endpoint thì lấy token admin
    if (config.url.includes("/admin")) {
      token = localStorage.getItem("admin_token");
    } else {
      token = localStorage.getItem("token");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`➡️ [${config.method?.toUpperCase()}] ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// 🧩 Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Nếu response.data là HATEOAS Collection, chuyển sang array
    if (
      response.data &&
      response.data._embedded &&
      typeof response.data._embedded === "object"
    ) {
      const key = Object.keys(response.data._embedded)[0]; // ví dụ voucherResponseList
      response.data = response.data._embedded[key];
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        if (error.config.url.includes("/admin")) {
          localStorage.removeItem("admin_token");
          window.location.href = "/auth/admin/login";
        } else {
          localStorage.removeItem("token");
          window.location.href = "/auth/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
