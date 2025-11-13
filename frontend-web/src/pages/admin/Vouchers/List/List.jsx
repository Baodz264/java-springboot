import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import VoucherService from "../../../../services/voucherService";
import { useToast } from "../../../../contexts/ToastProvider";
import {
  Container,
  Header,
  Table,
  Th,
  Td,
  Button,
  ImgPreview,
  SearchInput,
  TopBar,
} from "./style";

const VoucherList = () => {
  const [vouchers, setVouchers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const toast = useToast();

  const fetchAll = useCallback(async () => {
    try {
      const data = await VoucherService.getAll();
      setVouchers(data);
    } catch (err) {
      toast.error("Không thể tải danh sách voucher!");
    }
  }, [toast]);

  // load tất cả ban đầu
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // search realtime khi keyword thay đổi
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (keyword.trim() !== "") {
        VoucherService.search(keyword)
          .then((res) => setVouchers(res))
          .catch(() => toast.error("Tìm kiếm voucher thất bại!"));
      } else {
        fetchAll();
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [keyword, fetchAll, toast]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa voucher này?")) {
      try {
        await VoucherService.delete(id);
        setVouchers((prev) => prev.filter((v) => v.id !== id));
        toast.success("Xóa voucher thành công!");
      } catch {
        toast.error("Xóa voucher thất bại!");
      }
    }
  };

  return (
    <Container>
      <Header>Danh sách Voucher</Header>

      <TopBar>
        <SearchInput
          type="text"
          placeholder="Tìm theo mã voucher..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Link to="/admin/vouchers/add">
          <Button $variant="add">+ Thêm mới</Button>
        </Link>
      </TopBar>

      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Mã</Th>
            <Th>Loại</Th>
            <Th>Giá trị</Th>
            <Th>Ngày bắt đầu</Th>
            <Th>Ngày kết thúc</Th>
            <Th>Ảnh</Th>
            <Th>Trạng thái</Th>
            <Th>Hành động</Th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((v) => (
            <tr key={v.id}>
              <Td>{v.id}</Td>
              <Td>{v.code}</Td>
              <Td>{v.discountType}</Td>
              <Td>{v.discountValue}</Td>
              <Td>{v.startDate}</Td>
              <Td>{v.endDate}</Td>
              <Td>
                {v.imageUrl ? (
                  <ImgPreview
                    src={
                      v.imageUrl.startsWith("http")
                        ? v.imageUrl
                        : `http://localhost:8080${v.imageUrl}`
                    }
                    alt={v.code}
                    onError={(e) => {
                      e.target.src = "/images/default-voucher.png";
                    }}
                  />
                ) : (
                  <ImgPreview src="/images/default-voucher.png" alt="No Image" />
                )}
              </Td>
              <Td>{v.status ? "Hoạt động" : "Ngưng"}</Td>
              <Td>
                <Link to={`/admin/vouchers/view/${v.id}`}>
                  <Button>Xem</Button>
                </Link>
                <Link to={`/admin/vouchers/edit/${v.id}`}>
                  <Button $variant="edit">Sửa</Button>
                </Link>
                <Button $variant="delete" onClick={() => handleDelete(v.id)}>
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

export default VoucherList;
