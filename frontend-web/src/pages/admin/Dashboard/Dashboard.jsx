import React, { useEffect, useState, useCallback } from "react";
import {
  ShoppingCart,
  Users,
  DollarSign,
  BarChart3,
  Package,
  Truck,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import * as S from "./style";
import OrderService from "../../../services/orderService";
import UserService from "../../../services/userService";
import ProductService from "../../../services/productService";
import ShippingService from "../../../services/shippingService";
import PaymentService from "../../../services/paymentService";

function Dashboard() {
  const [soDonHang, setSoDonHang] = useState(0);
  const [doanhThu, setDoanhThu] = useState(0);
  const [soNguoiDung, setSoNguoiDung] = useState(0);
  const [phanTramHoanThanh, setPhanTramHoanThanh] = useState(0);
  const [soSanPham, setSoSanPham] = useState(0);
  const [donDangGiao, setDonDangGiao] = useState(0);
  const [tongThanhToan, setTongThanhToan] = useState(0);
  const [dataChart, setDataChart] = useState([]);
  const [loaiBieuDo, setLoaiBieuDo] = useState("day"); // day | week | month | year

  // --- Hàm lấy số tuần ISO ---
  const getISOWeek = useCallback((date) => {
    const tempDate = new Date(date);
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    const weekNo = Math.ceil(((tempDate - yearStart) / 86400000 + 1) / 7);
    return `${tempDate.getFullYear()}-W${String(weekNo).padStart(2, "0")}`;
  }, []);

  // --- Hàm chuyển đổi dữ liệu theo loại biểu đồ ---
  const chuyenDoiDuLieu = useCallback(
    (donHang, kieu) => {
      const dataMap = {};

      donHang.forEach((order) => {
        if (!order.createdAt) return;
        const date = new Date(order.createdAt);
        let key = "";

        switch (kieu) {
          case "day":
            key = date.toISOString().split("T")[0];
            break;
          case "week":
            key = getISOWeek(date);
            break;
          case "month":
            key = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}`;
            break;
          case "year":
            key = `${date.getFullYear()}`;
            break;
          default:
            key = "Không rõ";
        }

        dataMap[key] = (dataMap[key] || 0) + (order.totalPrice || 0);
      });

      return Object.keys(dataMap)
        .sort()
        .map((key) => ({
          label: key,
          revenue: dataMap[key],
        }));
    },
    [getISOWeek]
  );

  // --- useEffect lấy dữ liệu ban đầu ---
  useEffect(() => {
    const layDuLieu = async () => {
      try {
        const donHang = await OrderService.getAll();
        setSoDonHang(donHang.length);

        const tongDoanhThu = donHang.reduce(
          (sum, order) => sum + (order.totalPrice || 0),
          0
        );
        setDoanhThu(tongDoanhThu);

        const donHangHoanThanh = donHang.filter(
          (order) => order.status === "COMPLETED"
        ).length;
        setPhanTramHoanThanh(
          donHang.length > 0
            ? Math.round((donHangHoanThanh / donHang.length) * 100)
            : 0
        );

        const nguoiDung = await UserService.getAll();
        setSoNguoiDung(nguoiDung.length);

        const sanPham = await ProductService.getAll();
        setSoSanPham(sanPham.length);

        const shippings = await ShippingService.getAll();
        const dangGiao = shippings.filter((s) => s.status === "SHIPPING").length;
        setDonDangGiao(dangGiao);

        const payments = await PaymentService.getAll();
        const thanhToanThanhCong = payments
          .filter((p) => p.status === "COMPLETED")
          .reduce((sum, p) => sum + (p.amount || 0), 0);
        setTongThanhToan(thanhToanThanhCong);

        setDataChart(chuyenDoiDuLieu(donHang, loaiBieuDo));
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu Dashboard:", error);
      }
    };

    layDuLieu();
  }, [chuyenDoiDuLieu, loaiBieuDo]);

  // --- useEffect cập nhật biểu đồ khi đổi loại ---
  useEffect(() => {
    const capNhatBieuDo = async () => {
      const donHang = await OrderService.getAll();
      setDataChart(chuyenDoiDuLieu(donHang, loaiBieuDo));
    };
    capNhatBieuDo();
  }, [loaiBieuDo, chuyenDoiDuLieu]);

  // --- Hàm định dạng tiền ---
  const dinhDangTien = (value) =>
    value ? value.toLocaleString("vi-VN") + "₫" : "0₫";

  // --- Tooltip tùy chỉnh ---
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            padding: "8px 12px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ fontWeight: 600, marginBottom: "4px" }}>{label}</p>
          <p style={{ color: "#16a34a", fontWeight: 500 }}>
            Doanh thu: {dinhDangTien(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <S.Main>
      {/* --- Thống kê tổng quan --- */}
      <S.StatsGrid>
        <S.Card>
          <S.CardIcon $bg="#dbeafe" $color="#1d4ed8">
            <ShoppingCart size={26} />
          </S.CardIcon>
          <S.CardContent>
            <S.CardTitle>Đơn hàng</S.CardTitle>
            <S.CardNumber>{soDonHang}</S.CardNumber>
          </S.CardContent>
        </S.Card>

        <S.Card>
          <S.CardIcon $bg="#dcfce7" $color="#16a34a">
            <DollarSign size={26} />
          </S.CardIcon>
          <S.CardContent>
            <S.CardTitle>Doanh thu</S.CardTitle>
            <S.CardNumber>{dinhDangTien(doanhThu)}</S.CardNumber>
          </S.CardContent>
        </S.Card>

        <S.Card>
          <S.CardIcon $bg="#ede9fe" $color="#7c3aed">
            <Users size={26} />
          </S.CardIcon>
          <S.CardContent>
            <S.CardTitle>Người dùng</S.CardTitle>
            <S.CardNumber>{soNguoiDung}</S.CardNumber>
          </S.CardContent>
        </S.Card>

        <S.Card>
          <S.CardIcon $bg="#ffedd5" $color="#f97316">
            <BarChart3 size={26} />
          </S.CardIcon>
          <S.CardContent>
            <S.CardTitle>% Hoàn thành</S.CardTitle>
            <S.CardNumber>{phanTramHoanThanh}%</S.CardNumber>
          </S.CardContent>
        </S.Card>

        <S.Card>
          <S.CardIcon $bg="#fee2e2" $color="#ef4444">
            <Package size={26} />
          </S.CardIcon>
          <S.CardContent>
            <S.CardTitle>Sản phẩm</S.CardTitle>
            <S.CardNumber>{soSanPham}</S.CardNumber>
          </S.CardContent>
        </S.Card>

        <S.Card>
          <S.CardIcon $bg="#bae6fd" $color="#0284c7">
            <Truck size={26} />
          </S.CardIcon>
          <S.CardContent>
            <S.CardTitle>Đơn đang giao</S.CardTitle>
            <S.CardNumber>{donDangGiao}</S.CardNumber>
          </S.CardContent>
        </S.Card>

        <S.Card>
          <S.CardIcon $bg="#fef9c3" $color="#65a30d">
            <DollarSign size={26} />
          </S.CardIcon>
          <S.CardContent>
            <S.CardTitle>Thanh toán thành công</S.CardTitle>
            <S.CardNumber>{dinhDangTien(tongThanhToan)}</S.CardNumber>
          </S.CardContent>
        </S.Card>
      </S.StatsGrid>

      {/* --- Biểu đồ doanh thu --- */}
      <S.ChartSection>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#111827",
            }}
          >
            Biểu đồ doanh thu theo{" "}
            {loaiBieuDo === "day"
              ? "ngày"
              : loaiBieuDo === "week"
              ? "tuần"
              : loaiBieuDo === "month"
              ? "tháng"
              : "năm"}
          </h2>
          <select
            value={loaiBieuDo}
            onChange={(e) => setLoaiBieuDo(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
            }}
          >
            <option value="day">Theo ngày</option>
            <option value="week">Theo tuần</option>
            <option value="month">Theo tháng</option>
            <option value="year">Theo năm</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={dataChart}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#16a34a" stopOpacity={0.8} />
                <stop offset="90%" stopColor="#16a34a" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={30} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#16a34a"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              name="Doanh thu"
            />
          </LineChart>
        </ResponsiveContainer>
      </S.ChartSection>
    </S.Main>
  );
}

export default Dashboard;
