import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { useRecoilValue } from 'recoil';
import { fetchBestsellersData } from 'Recoil/BookData';

const ArrowIcon = <IoIosArrowForward size={25} color='gray' />;
const BestBookItem = () => {
  const bookData = useRecoilValue(fetchBestsellersData);
  return (
    <SItemListBox>
      {bookData.item.slice(0, 5).map((book, lank) => (
        <SItemList key={book.itemId}>
          <SItemDescBox to={`/book/${book.isbn || book.isbn13}`}>
            <SBookImg>
              <img src={book.cover} alt={book.title} />
            </SBookImg>
            <strong>{lank + 1}</strong>
            <SBookDesc>
              <h3>{book.title}</h3>
              <p>{book.publisher}</p>
            </SBookDesc>
          </SItemDescBox>
          <Link to={`/book/${book.isbn || book.isbn13}`}>{ArrowIcon}</Link>
        </SItemList>
      ))}
    </SItemListBox>
  );
};

export default BestBookItem;

const SItemListBox = styled.ul`
  padding: 0px 15px;
`;
const SBookImg = styled.div`
  width: 100px;
  height: 120px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
`;
const SItemDescBox = styled(Link)`
  display: flex;
  strong {
    font-size: var(--font-lg-size);
    margin: 15px;
  }
`;
const SBookDesc = styled.div`
  display: flex;
  max-width: 180px;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0px;

  h3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-height: 1.3;
    font-size: var(--font-xs-size);
    /* height: calc(1em * 1.6 * 2); */
  }

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: var(--font-xxs-size);
    color: var(--gray-500);
  }
`;
const SItemList = styled.li`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dedddd;
  padding: 10px 0px;
  align-items: center;
  &:last-child {
    border-bottom: none;
  }
  &:first-child {
    padding-top: 0;
  }
`;
