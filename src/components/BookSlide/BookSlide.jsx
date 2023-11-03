import React from 'react';
import styled from 'styled-components'; // Recoil Selector 임포트
import { IoIosArrowForward } from 'react-icons/io';
import BookSlideItem from './BookSlideItem';
import { Link } from 'react-router-dom';
// 리코일
import { useRecoilValue } from 'recoil';
import { fetchBestsellersData, fetchNewBooksData, fetchNewBookSpecialData } from 'Recoil/BookData';

export default function BookSlide({ title, dataType, desc, path }) {
  let bookData;

  if (dataType === 'bestsellers') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    bookData = useRecoilValue(fetchBestsellersData);
  } else if (dataType === 'newBooks') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    bookData = useRecoilValue(fetchNewBooksData);
  } else if (dataType === 'newBookSpecial') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    bookData = useRecoilValue(fetchNewBookSpecialData);
  }
  // bookData가 null 또는 undefined인 경우 초기화
  bookData = bookData || { item: [] };
  return (
    <SSliderContainer>
      <STitleBox>
        <STitleWrapper>
          <h2>{title}</h2>
          <SLink to={path}>
            <IoIosArrowForward />
          </SLink>
        </STitleWrapper>
        <p>{desc}</p>
      </STitleBox>
      <SWrapprer>
        <SCarousal>
          {bookData.item.slice(0, 10).map((item) => (
            <BookSlideItem
              key={item.id}
              title={item.title}
              author={item.author}
              cover={item.cover}
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
  overflow: scroll hidden;
  white-space: nowrap;
  display: flex;
  margin-left: 10px;
  overflow-x: auto;
  font-size: 0;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
