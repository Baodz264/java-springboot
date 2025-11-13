import React, { useEffect, useState } from "react";
import BannerService from "../../../../services/bannerService";
import { useParams } from "react-router-dom";
import { Container, Header, ImgPreview, InfoGrid, Status } from "./style";

const BannerView = () => {
  const { id } = useParams();
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    BannerService.getById(id).then((res) => setBanner(res.data));
  }, [id]);

  if (!banner) return <p>Đang tải...</p>;

  return (
    <Container>
      <Header>Chi tiết Banner</Header>
      <InfoGrid>
        <b>ID:</b> <p>{banner.id}</p>
        <b>Tiêu đề:</b> <p>{banner.title}</p>
        <b>Link:</b> <p>{banner.link}</p>
        <b>Ngày bắt đầu:</b> <p>{banner.startDate}</p>
        <b>Ngày kết thúc:</b> <p>{banner.endDate}</p>
        <b>Trạng thái:</b>
        <p>
          {/* ✅ Dùng transient prop $active */}
          <Status $active={banner.status}>
            {banner.status ? "Hiển thị" : "Ẩn"}
          </Status>
        </p>
      </InfoGrid>
      {banner.imageUrl && (
        <ImgPreview
          src={`http://localhost:8080${banner.imageUrl}`}
          alt={banner.title}
        />
      )}
    </Container>
  );
};

export default BannerView;
