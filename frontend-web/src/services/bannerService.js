import api from "./api";

// Lấy tất cả banner
const list = () => api.get("/banners");

// Lấy banner theo ID
const getById = (id) => api.get(`/banners/${id}`);


// Tạo mới banner
const create = (banner, image) => {
  const formData = new FormData();

  // Ép status về Boolean để backend nhận đúng
  const payload = {
    ...banner,
    status: banner.status === true || banner.status === "true",
  };

  formData.append("banner", JSON.stringify(payload));

  if (image) formData.append("image", image);

  // Axios tự set Content-Type + boundary cho multipart/form-data
  return api.post("/banners", formData);
};

// Cập nhật banner
const update = (id, banner, image) => {
  const formData = new FormData();

  // Ép status về Boolean để backend nhận đúng
  const payload = {
    ...banner,
    status: banner.status === true || banner.status === "true",
  };

  formData.append("banner", JSON.stringify(payload));

  if (image) formData.append("image", image);

  // Không set headers "Content-Type", để Axios tự set
  return api.put(`/banners/${id}`, formData);
};
const search = (keyword) => api.get(`/banners/search?keyword=${keyword}`);
// Xóa banner
const remove = (id) => api.delete(`/banners/${id}`);

const BannerService = {
  list,
  getById,
  create,
  update,
  remove,
  search,
};


export default BannerService;
