import React, { useState } from 'react';
import BookSlideItem from './BookSlideItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { Link } from 'react-router-dom';
// 리코일
import { useRecoilValue } from 'recoil';
import { fetchBestsellersData, fetchNewBooksData, fetchNewBookSpecialData } from 'Recoil/BookData';

export default function BookSlide({ title, dataType, desc, path }) {
  const [hidePrev, setHidePrev] = useState(true);
  const [hideNext, setHideNext] = useState(false);

  const bookData = useRecoilValue(
    dataType === 'bestsellers'
      ? fetchBestsellersData
      : dataType === 'newbooks'
      ? fetchNewBooksData
      : dataType === 'special'
      ? fetchNewBookSpecialData
      : fetchBestsellersData,
  );
  const settings = {
    dots: false,
    fade: false,
    infinite: false,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow hideNext={hideNext} setHidePrev={setHidePrev} />,
    prevArrow: <PrevArrow hidePrev={hidePrev} setHideNext={setHideNext} />,
    beforeChange: (current, next) => {
      if (next === 0) {
        setHidePrev(true);
        setHideNext(false);
      } else if (next === 6) {
        setHidePrev(false);
        setHideNext(true);
      } else {
        setHidePrev(false);
        setHideNext(false);
      }
    },
  };

  return (
    <SSliderContainer>
      {/* 슬라이드 헤더부분 */}
      <SSliderHeader>
        <STitleWrapper>
          <h1>{title}</h1>
          <SLink to={path}>
            <p>더보기</p>
          </SLink>
        </STitleWrapper>
        <p>{desc}</p>
      </SSliderHeader>
      {/* 슬라이드 아이템 */}
      <SSliderBody {...settings}>
        {bookData.item.slice(0, 9).map((item) => (
          <BookSlideItem
            key={item.isbn13}
            title={item.title}
            author={item.author}
            cover={item.cover}
            isbn={item.isbn || item.isbn13}
          />
        ))}
      </SSliderBody>
    </SSliderContainer>
  );
}
const SSliderBody = styled(Slider)`
  display: flex;
  position: relative;
  padding: 20px 10px;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-list .slick-track {
    display: flex;
    justify-content: center;
    height: 208px;
  }
  .slick-list .slick-track div {
    width: 110px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 208px;
  }
`;

const SSliderContainer = styled.section`
  margin-top: 25px;
`;
const SSliderHeader = styled.div`
  margin: 0px 15px;
  h2 {
    font-size: 17px;
    font-weight: bold;
  }
  p {
    font-size: small;
    color: var(--gray-500);
  }
`;
const STitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const NextArrow = ({ onClick, hideNext }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick(e);
  };
  return (
    <Sbutton
      onClick={handleClick}
      type='button'
      $next='true'
      $hide={hideNext}
      aria-label='앞으로 이동'
    >
      <IoIosArrowForward />
    </Sbutton>
  );
};

const PrevArrow = ({ onClick, hidePrev }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick(e);
  };
  return (
    <Sbutton onClick={handleClick} type='button' $hide={hidePrev} aria-label='뒤로이동'>
      <IoIosArrowBack />
    </Sbutton>
  );
};
const Sbutton = styled.button`
  width: 25px;
  height: 25px;
  background-color: #ffffff;
  opacity: 0.8;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  ${({ $next }) => ($next ? 'right: 4px;' : 'left: 4px;')}
  top: 36%;
  z-index: 90;
  display: ${({ $hide }) => ($hide ? 'none' : 'flex')};
`;
