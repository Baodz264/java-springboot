import React, { useState } from "react";
import BannerService from "../../../../services/bannerService";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../contexts/ToastProvider";

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

const BannerAdd = () => {
  const navigate = useNavigate();
  const toast = useToast(); // dùng custom hook thay vì useContext

  const [banner, setBanner] = useState({
    title: "",
    link: "",
    startDate: "",
    endDate: "",
    status: "true",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setBanner({ ...banner, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...banner, status: banner.status === "true" };
      await BannerService.create(payload, image);
      toast.success("Thêm banner thành công!");
      navigate("/admin/banners");
    } catch (error) {
      toast.error("Thêm banner thất bại!");
      console.error(error);
    }
  };

  return (
    <Container>
      <Header>Thêm Banner</Header>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Tiêu đề</Label>
          <Input name="title" value={banner.title} onChange={handleChange} />
        </div>
        <div>
          <Label>Link</Label>
          <Input name="link" value={banner.link} onChange={handleChange} />
        </div>
        <div>
          <Label>Ngày bắt đầu</Label>
          <Input
            type="date"
            name="startDate"
            value={banner.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Ngày kết thúc</Label>
          <Input
            type="date"
            name="endDate"
            value={banner.endDate}
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
          <Label>Ảnh</Label>
          <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
          {image && (
            <ImgPreview src={URL.createObjectURL(image)} alt="preview" />
          )}
        </div>
        <Button $variant="add" type="submit">
          Lưu
        </Button>
      </Form>
    </Container>
  );
};

export default BannerAdd;
