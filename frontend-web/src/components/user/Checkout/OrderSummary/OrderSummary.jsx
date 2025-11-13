import React, { useState, useRef } from "react";
import { Summary, TotalRow, Total, CheckoutButton } from "./style";
import "./payment-popup.css";
import successSoundFile from "../../../../assets/success.mp3";

export default function OrderSummary({
  subtotal,
  shippingFee,
  discount,
  total,
  handleCheckout, // hàm đã sửa trả về true/false nếu checkOnly
  isProcessing,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("Đang thanh toán...");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const successSound = useRef(null);

  const handlePayment = async () => {
    try {
      // ✅ Kiểm tra điều kiện trước mà không mở popup
      const isValid = await handleCheckout(true); // chỉ check điều kiện
      if (!isValid) return; // chưa đủ điều kiện → thoát

      // ✅ Mở popup khi mọi điều kiện hợp lệ
      setShowPopup(true);
      setPopupMessage("Đang thanh toán...");
      setIsSuccess(false);
      setTimeout(() => setIsVisible(true), 10);

      // Gọi checkout thực tế
      await handleCheckout(false);

      // ⏳ Hiện loading 3s rồi báo thành công
      setTimeout(() => {
        setPopupMessage("Thanh toán thành công!");
        setIsSuccess(true);

        // 🔊 Phát âm thanh
        const sound = successSound.current;
        if (sound) {
          sound.currentTime = 0;
          sound
            .play()
            .catch((err) => console.warn("Không thể phát âm thanh:", err));
        }
      }, 3000);

      // ⏰ Đóng popup sau tổng 5.5s (3s loading + 2.5s tick)
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setShowPopup(false);
          setIsSuccess(false);
        }, 500);
      }, 5500);
    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      setPopupMessage("❌ Thanh toán thất bại!");
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setShowPopup(false), 500);
      }, 2500);
    }
  };

  return (
    <>
      <audio ref={successSound} src={successSoundFile} preload="auto" />

      <Summary>
        <TotalRow>
          <div>Tạm tính:</div>
          <div>{subtotal.toLocaleString()}₫</div>
        </TotalRow>
        <TotalRow>
          <div>Phí vận chuyển:</div>
          <div>{shippingFee.toLocaleString()}₫</div>
        </TotalRow>
        <TotalRow>
          <div>Giảm giá:</div>
          <div>-{discount.toLocaleString()}₫</div>
        </TotalRow>

        <Total>Tổng thanh toán: {total.toLocaleString()}₫</Total>

        <CheckoutButton onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? <span className="spinner"></span> : "Thanh toán ngay"}
        </CheckoutButton>
      </Summary>

      {showPopup && (
        <div className={`payment-popup ${isVisible ? "fade-in" : "fade-out"}`}>
          <div className="payment-box">
            {!isSuccess ? (
              <>
                <div className="spinner large"></div>
                <p>{popupMessage}</p>
              </>
            ) : (
              <>
                <div className="checkmark-wrapper">
                  <div className="pulse"></div>
                  <div className="checkmark-container">
                    <svg
                      className="checkmark"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 52 52"
                    >
                      <circle
                        className="checkmark-circle"
                        cx="26"
                        cy="26"
                        r="25"
                        fill="none"
                      />
                      <path
                        className="checkmark-check"
                        fill="none"
                        d="M14 27l7 7 16-16"
                      />
                    </svg>
                  </div>
                </div>
                <p className="success-text">{popupMessage}</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
