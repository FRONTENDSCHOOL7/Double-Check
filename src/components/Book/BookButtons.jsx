import React, { useState } from 'react';
import { BsPencilSquare } from '@react-icons/all-files/bs/BsPencilSquare';
import { Link } from 'react-router-dom';
import { BiLike } from '@react-icons/all-files/bi/BiLike';
import styled, { css } from 'styled-components';

const BookButtons = ({ detailInfo }) => {
  const [liked, setLiked] = useState(false);
  const handleLikeButtonClick = () => {
    // 추천 버튼
    setLiked(!liked);
  };

  const handleBookDownButtonClick = () => {
    // 책장 담기
  };
  return (
    <SLinkbox>
      <li>
        <SButton onClick={handleLikeButtonClick}>
          {liked ? <BiLike fill='var(--dark-purple)' /> : <BiLike />}
          <p>0</p>
        </SButton>
      </li>
      <li>
        <SLink to='/post/upload' state={detailInfo}>
          <BsPencilSquare />
          <p>피드 쓰기</p>
        </SLink>
      </li>
      <li>
        <SButton onClick={handleBookDownButtonClick}>
          <p>책장에 담기</p>
        </SButton>
      </li>
    </SLinkbox>
  );
};

export default BookButtons;

const SLinkbox = styled.ul`
  text-align: center;
  display: flex;
  justify-content: center;
  margin: 40px 0px;

  li {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
  }

  li::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 0px;
    height: 70%;
    width: 1px;
    background-color: var(--gray-300);
  }

  li:last-child::after {
    display: none;
  }
`;
const buttonStyles = css`
  width: 60px;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 25px;
    color: var(--gray-500);
  }

  /* &:hover svg {
    color: var(--dark-purple);
  } */
`;
const SLink = styled(Link)`
  ${buttonStyles}
`;
const SButton = styled.button`
  ${buttonStyles}
`;
