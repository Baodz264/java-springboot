import React, { useEffect, useState } from "react";
import PaymentService from "../../../../services/paymentService";
import OrderService from "../../../../services/orderService"; // ✅ thêm
import { useParams, useNavigate } from "react-router-dom";
import { Container, Header, DetailBox, Button, Badge } from "./style";
import { useToast } from "../../../../contexts/ToastProvider";

const PaymentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [order, setOrder] = useState(null); // ✅ thêm
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PaymentService.getById(id);
        setPayment(data);

        // ✅ nếu API trả về payment.orderId thì load order từ OrderService
        if (data.orderId) {
          const orderData = await OrderService.getById(data.orderId);
          setOrder(orderData);
        }
      } catch {
        toast.error("Không thể tải chi tiết payment!");
      }
    };
    fetchData();
  }, [id, toast]);

  if (!payment) return <p>Đang tải...</p>;

  return (
    <Container>
      <Header>
        <h2>Chi tiết Payment</h2>
      </Header>
      <DetailBox>
        <p>
          <strong>ID:</strong> {payment.id}
        </p>
        <p>
          <strong>Số tiền:</strong> {payment.amount.toLocaleString()} đ
        </p>
        <p>
          <strong>Provider:</strong> {payment.provider}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <Badge $status={payment.status}>{payment.status}</Badge>
        </p>
        <p>
          <strong>Mã giao dịch:</strong> {payment.transactionCode}
        </p>
        <p>
          <strong>Order ID:</strong>{" "}
          {order ? (
            <>
              {order.id} - {order.status}
            </>
          ) : payment.orderId ? (
            payment.orderId
          ) : (
            "Không có"
          )}
        </p>
      </DetailBox>
      <Button onClick={() => navigate("/admin/payments")}>⬅ Quay lại</Button>
    </Container>
  );
};

export default PaymentView;
