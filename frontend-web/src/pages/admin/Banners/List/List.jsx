import React, { useEffect, useState } from "react";
import BannerService from "../../../../services/bannerService";
import {
  Container,
  Header,
  Table,
  Th,
  Td,
  Button,
  LinkButton,
  SearchInput,
  TopBar,
} from "./style";
import { useToast } from "../../../../contexts/ToastProvider";

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [keyword, setKeyword] = useState("");
  const toast = useToast();

  // load tất cả khi mới vào
  useEffect(() => {
    BannerService.list()
      .then((res) => setBanners(res.data))
      .catch(() => toast.error("Lấy danh sách banner thất bại!"));
  }, [toast]);

  // search realtime khi keyword thay đổi
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (keyword.trim() !== "") {
        BannerService.search(keyword)
          .then((res) => setBanners(res.data))
          .catch(() => toast.error("Tìm kiếm banner thất bại!"));
      } else {
        // nếu clear ô search thì load lại toàn bộ
        BannerService.list()
          .then((res) => setBanners(res.data))
          .catch(() => toast.error("Lấy danh sách banner thất bại!"));
      }
    }, 400); // debounce 400ms

    return () => clearTimeout(delayDebounce);
  }, [keyword, toast]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa banner này?")) {
      try {
        await BannerService.remove(id);
        setBanners((prev) => prev.filter((b) => b.id !== id));
        toast.success("Xóa banner thành công!");
      } catch (err) {
        console.error("Lỗi khi xóa banner:", err);
        toast.error("Xóa banner thất bại!");
      }
    }
  };

  return (
    <Container>
      <Header>Danh sách Banner</Header>

      <TopBar>
        <SearchInput
          type="text"
          placeholder="Tìm kiếm theo tiêu đề..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <LinkButton to="/admin/banners/add" $variant="add">
          + Thêm mới
        </LinkButton>
      </TopBar>

      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Tiêu đề</Th>
            <Th>Ảnh</Th>
            <Th>Trạng thái</Th>
            <Th>Hành động</Th>
          </tr>
        </thead>
        <tbody>
          {banners.map((b) => (
            <tr key={b.id}>
              <Td>{b.id}</Td>
              <Td>{b.title}</Td>
              <Td>
                {b.imageUrl && (
                  <img
                    src={`http://localhost:8080${b.imageUrl}`}
                    alt={b.title}
                    width="120"
                  />
                )}
              </Td>
              <Td>{b.status ? "Hiển thị" : "Ẩn"}</Td>
              <Td>
                <LinkButton to={`/admin/banners/view/${b.id}`}>
                  Xem
                </LinkButton>
                <LinkButton to={`/admin/banners/edit/${b.id}`} $variant="edit">
                  Sửa
                </LinkButton>
                <Button $variant="delete" onClick={() => handleDelete(b.id)}>
                  Xóa
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BannerList;
