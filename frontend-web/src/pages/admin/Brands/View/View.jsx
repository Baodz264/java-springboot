import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Header, Detail, Button } from "./style";
import BrandService from "../../../../services/brandService";
import { useToast } from "../../../../contexts/ToastProvider";

const BrandView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await BrandService.getById(id);
        setBrand(data);
      } catch {
        toast.error("Không thể tải chi tiết brand!");
      }
    };
    fetchData();
  }, [id, toast]);

  if (!brand) return <p>Đang tải...</p>;

  // Xử lý URL ảnh
  const logoUrl = brand.logoUrl
    ? brand.logoUrl.startsWith("http")
      ? brand.logoUrl
      : `http://localhost:8080${brand.logoUrl}`
    : "/images/default-brand.png";

  return (
    <Container>
      <Header>
        <h2>Chi tiết Brand</h2>
      </Header>
      <Detail>
        <p><strong>ID:</strong> {brand.id}</p>
        <p><strong>Tên:</strong> {brand.name}</p>
        <p><strong>Mô tả:</strong> {brand.description}</p>
        <p><strong>Trạng thái:</strong> {brand.status ? "Hoạt động" : "Không hoạt động"}</p>
        <img
          src={logoUrl}
          alt={brand.name}
          style={{ width: "150px", borderRadius: "5px" }}
          onError={(e) => { e.target.src = "/images/default-brand.png"; }}
        />
      </Detail>
      <Button onClick={() => navigate("/admin/brands")}>⬅ Quay lại</Button>
    </Container>
  );
};

export default BrandView;
