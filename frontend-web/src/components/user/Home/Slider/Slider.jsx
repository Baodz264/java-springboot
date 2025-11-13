import React, { useEffect, useState } from "react";
import BannerService from "../../../../services/bannerService";
import { SliderWrapper, Slide, SlideImage, SlideTitle } from "./style";

const Slider = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await BannerService.list();
        setBanners(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  if (!banners.length) return null;

  return (
    <SliderWrapper>
      {banners.map((banner, index) => (
        <Slide key={banner.id} style={{ opacity: index === currentIndex ? 1 : 0 }}>
          <a href={banner.link || "#"} target="_blank" rel="noopener noreferrer">
            <SlideImage src={banner.imageUrl.startsWith("http") ? banner.imageUrl : `http://localhost:8080${banner.imageUrl}`} alt={banner.title || "Banner"} />
            {banner.title && <SlideTitle>{banner.title}</SlideTitle>}
          </a>
        </Slide>
      ))}
    </SliderWrapper>
  );
};

export default Slider;
