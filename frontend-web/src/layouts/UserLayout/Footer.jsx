import React from "react";
import {
  FooterWrapper,
  FooterGrid,
  FooterCol,
  FooterBottom,
  FooterLinks,
  FooterLink,
  SocialIcons,
  SocialIcon,
} from "./style";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <FooterWrapper>
      <FooterGrid>
        <FooterCol>
          <h3>ShopOnline</h3>
          <p>
            Chuyên cung cấp sản phẩm chất lượng, giá tốt, giao hàng nhanh chóng
            và uy tín hàng đầu.
          </p>
          <SocialIcons>
            <SocialIcon><FaFacebook /></SocialIcon>
            <SocialIcon><FaInstagram /></SocialIcon>
            <SocialIcon><FaTwitter /></SocialIcon>
            <SocialIcon><FaYoutube /></SocialIcon>
          </SocialIcons>
        </FooterCol>

        <FooterCol>
          <h4>Sản phẩm</h4>
          <FooterLinks>
            <FooterLink>Áo thun</FooterLink>
            <FooterLink>Giày dép</FooterLink>
            <FooterLink>Phụ kiện</FooterLink>
            <FooterLink>Hàng mới</FooterLink>
          </FooterLinks>
        </FooterCol>

        <FooterCol>
          <h4>Hỗ trợ</h4>
          <FooterLinks>
            <FooterLink>Hướng dẫn mua hàng</FooterLink>
            <FooterLink>Chính sách đổi trả</FooterLink>
            <FooterLink>Bảo hành</FooterLink>
            <FooterLink>Liên hệ CSKH</FooterLink>
          </FooterLinks>
        </FooterCol>

        <FooterCol>
          <h4>Liên hệ</h4>
          <p>📍 123 Nguyễn Trãi, Hà Nội</p>
          <p>📞 0123 456 789</p>
          <p>📧 support@shoponline.com</p>
        </FooterCol>
      </FooterGrid>

      <FooterBottom>
        © {new Date().getFullYear()} ShopOnline - All rights reserved.
      </FooterBottom>
    </FooterWrapper>
  );
}

export default Footer;
