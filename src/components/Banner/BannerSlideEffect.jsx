import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BannerSlider from './BannerSlider';
import BannerDot from './BannerDot';
import { BannerData } from './BannerData';

function BannerSlideShow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === BannerData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? BannerData.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <BannerSliderWrapper>
        <BannerSlider
          banners={BannerData}
          currentSlide={currentSlide}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
        />
        <BannerDot banners={BannerData} currentSlide={currentSlide} goToSlide={goToSlide} />
      </BannerSliderWrapper>
    </>
  );
}

export default BannerSlideShow;

const BannerSliderWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  height: 200px;
  z-index: 10;
`;
