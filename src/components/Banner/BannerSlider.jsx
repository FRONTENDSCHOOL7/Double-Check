import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import Button from 'components/Common/Button/Button';
function BannerSlider({ banners, currentSlide, nextSlide, prevSlide }) {
  return (
    <>
      {/*  bgImg={banner.img} */}
      <SBannerSliderContent currentSlide={currentSlide}>
        {banners.map((banner, index) => (
          <SBannerSlide key={index} color={banner.color}>
            <div>
              <SText>{banner.message}</SText>
              <Link to={banner.linkTo}>
                <SBuntton category='basic' shape='xsmall'>
                  바로 가기
                </SBuntton>
              </Link>
            </div>
          </SBannerSlide>
        ))}
      </SBannerSliderContent>

      {/* 버튼 */}
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
  background-size: 70%;
  background-position: 90%;
  display: flex;
  align-items: center;
  padding: 0px 30px;

  div {
    width: 60%;
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
  line-height: 20px;
  font-size: medium;
`;

const SBuntton = styled(Button)`
  font-size: var(--font-xs-size);
`;

export default BannerSlider;
