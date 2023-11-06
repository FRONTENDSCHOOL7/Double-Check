import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import BookSlideItem from './BookSlideItem';
import { Link } from 'react-router-dom';
// 리코일
import { useRecoilValue } from 'recoil';
import { fetchBestsellersData, fetchNewBooksData, fetchNewBookSpecialData } from 'Recoil/BookData';

export default function BookSlide({ title, dataType, desc, path }) {
  const bookData = useRecoilValue(
    dataType === 'bestsellers'
      ? fetchBestsellersData
      : dataType === 'newBooks'
      ? fetchNewBooksData
      : dataType === 'newBookSpecial'
      ? fetchNewBookSpecialData
      : fetchBestsellersData,
  );

  const [prevPageX, setPrevPageX] = useState(null);
  const [isDragStart, setDragStart] = useState(false);
  const [positionDiff, setPositionDiff] = useState(0);
  const slideRef = useRef(null);
  const onDragStart = (e) => {
    e.preventDefault();
    setDragStart(true);
    setPrevPageX(e.pageX || e.touches[0].pageX);
  };

  const onDragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    const currentPositionX = e.pageX || e.touches[0].pageX;
    const diff = currentPositionX - prevPageX;
    setPositionDiff(diff);
    const carousal = e.currentTarget;
    carousal.scrollLeft -= diff;
    setPrevPageX(currentPositionX);
  };

  const onDragStop = () => {
    setDragStart(false);
    autoSlide();
  };

  const autoSlide = () => {
    if (slideRef.current) {
      const carousal = slideRef.current;
      const slideWidth = carousal.clientWidth;
      const threshold = slideWidth / 4;
      if (Math.abs(positionDiff) > threshold) {
        const direction = positionDiff > 0 ? 1 : -1;
        const targetScrollLeft = carousal.scrollLeft + direction * slideWidth;
        carousal.scrollLeft = targetScrollLeft;
      }
    }
  };

  return (
    <SSliderContainer>
      <STitleBox>
        <STitleWrapper>
          {title}
          <SLink to={path}>
            <IoIosArrowForward />
          </SLink>
        </STitleWrapper>
        <p>{desc}</p>
      </STitleBox>

      <SWrapprer>
        <SCarousal
          onMouseDown={onDragStart}
          onMouseMove={onDragging}
          onMouseUp={onDragStop}
          onMouseLeave={onDragStop}
          onTouchStart={onDragStart}
          onTouchMove={onDragging}
        >
          {bookData.item.slice(0, 10).map((item) => (
            <BookSlideItem
              key={item.id}
              title={item.title}
              author={item.author}
              cover={item.cover}
              isbn={item.isbn13}
            />
          ))}
        </SCarousal>
      </SWrapprer>
    </SSliderContainer>
  );
}
const SSliderContainer = styled.section`
  margin-top: 25px;
`;
const STitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const STitleBox = styled.div`
  margin: 0px 15px;
  h2 {
    font-size: 17px;
    font-weight: bold;
  }
  p {
    font-size: small;
    color: var(--gray-500);
    margin-top: 10px;
  }
`;
const SLink = styled(Link)`
  display: flex;
  align-items: center;
`;
const SWrapprer = styled.div`
  width: 100%;
`;
const SCarousal = styled.div`
  /* overflow: scroll hidden;
  white-space: nowrap;
  display: flex;
  margin-left: 10px;
  overflow-x: auto;
  font-size: 0;
  scrollbar-width: none;
  -ms-overflow-style: none; */
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  cursor: grab;
  margin-left: 10px;
`;
// &::-webkit-scrollbar {
//   display: none;
// }
