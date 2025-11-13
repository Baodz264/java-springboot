import React, { useEffect, useState, useContext } from "react";
import BannerService from "../../../../services/bannerService";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContext } from "../../../../contexts/ToastProvider"; // ✅ toast
import {
  Container,
  Header,
  Form,
  Label,
  Input,
  Select,
  ImgPreview,
  Button,
} from "./style";

const BannerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useContext(ToastContext); // ✅ dùng toast

  const [banner, setBanner] = useState(null);
  const [image, setImage] = useState(null);

  // Lấy dữ liệu banner theo id
  useEffect(() => {
    BannerService.getById(id)
      .then((res) => {
        // Đảm bảo status luôn dạng string để Select hoạt động
        setBanner({
          ...res.data,
          status: res.data.status ? "true" : "false",
        });
      })
      .catch((err) => {
        console.error("Lỗi khi tải banner:", err);
        toast.error("Không tải được dữ liệu banner!");
      });
  }, [id, toast]);

  const handleChange = (e) => {
    setBanner({ ...banner, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // payload chuẩn, convert status string -> boolean
    const payload = {
      ...banner,
      status: banner.status === "true",
    };

    try {
      await BannerService.update(id, payload, image);
      toast.success("Cập nhật banner thành công!");
      navigate("/admin/banners");
    } catch (error) {
      console.error("Lỗi cập nhật banner:", error.response || error);
      toast.error("Cập nhật banner thất bại!");
    }
  };

  if (!banner) return <p>Đang tải...</p>;

  return (
    <Container>
      <Header>Sửa Banner</Header>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Tiêu đề</Label>
          <Input
            name="title"
            value={banner.title || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Link</Label>
          <Input
            name="link"
            value={banner.link || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Ngày bắt đầu</Label>
          <Input
            type="date"
            name="startDate"
            value={banner.startDate || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Ngày kết thúc</Label>
          <Input
            type="date"
            name="endDate"
            value={banner.endDate || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Trạng thái</Label>
          <Select name="status" value={banner.status} onChange={handleChange}>
            <option value="true">Hiển thị</option>
            <option value="false">Ẩn</option>
          </Select>
        </div>
        <div>
          <Label>Ảnh mới</Label>
          <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
          {image ? (
            <ImgPreview src={URL.createObjectURL(image)} alt="preview" />
          ) : (
            banner.imageUrl && (
              <ImgPreview
                src={`http://localhost:8080${banner.imageUrl}`}
                alt="current"
              />
            )
          )}
        </div>
        <Button $variant="edit" type="submit">
          Cập nhật
        </Button>
      </Form>
    </Container>
  );
};

export default BannerEdit;
