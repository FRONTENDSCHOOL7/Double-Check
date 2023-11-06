import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

import { StyledButton } from '../Common/Button/ButtonStyle';

function BannerSlider({ banners, currentSlide, nextSlide, prevSlide }) {
  // 렌더링될 슬라이드 컴포넌트 배열 생성
  const slides = banners.map((banner, index) => (
    <SBannerSlide key={index} color={banner.color} bgImg={banner.img} size={banner.size}>
      <div>
        <SText>{banner.message}</SText>
        {banner.linkTo && (
          <Link to={banner.linkTo}>
            <SStyledButton category='basic' shape='xsmall' backgroundColor={banner.btncolor}>
              바로 가기
            </SStyledButton>
          </Link>
        )}
      </div>
    </SBannerSlide>
  ));

  return (
    <>
      <SBannerSliderContent currentSlide={currentSlide}>{slides}</SBannerSliderContent>
      {/* 슬라이드 이전/다음 버튼 */}
      <SliderButton position='left' onClick={prevSlide}>
        <BsArrowLeftShort />
      </SliderButton>
      <SliderButton position='right' onClick={nextSlide}>
        <BsArrowRightShort />
      </SliderButton>
    </>
  );
}

const SBannerSliderContent = styled.div`
  height: 100%;
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${(props) => props.currentSlide * 100}%);
`;

const SBannerSlide = styled.div`
  min-width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${(props) => props.color};
  background-image: url(${(props) => props.bgImg});
  background-repeat: no-repeat;

  background-size: 135px;
  background-position: 88% 110%;
  ${(props) =>
    props.size === 'small' &&
    css`
      background-size: 180px;
      background-position: 84% 94%;
    `}
  display: flex;
  align-items: center;
  padding: 0px 30px;

  div {
    width: 80%;
    padding: 5px;
  }
`;

const SliderButton = styled.button`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(156, 155, 155, 0.5);
  opacity: 0.5;
  border-radius: 50%;
  color: white;
  text-align: center;
  line-height: 15px;
  cursor: pointer;
  ${({ position }) => (position === 'left' ? 'left: 6px;' : 'right: 6px;')}

  &:hover {
    background-color: rgba(133, 133, 133, 0.8);
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SText = styled.h2`
  margin: 0px 0px 10px 4px;
  line-height: 28px;
  font-size: 18px;
  color: #363636;
`;

const SStyledButton = styled(StyledButton)`
  font-size: var(--font-xxs-size);
  color: black;
  background-color: ${(props) => props.backgroundColor};
`;

export default BannerSlider;
