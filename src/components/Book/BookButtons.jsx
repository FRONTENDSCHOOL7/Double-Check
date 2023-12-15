import React, { useState } from 'react';
import { BsPencilSquare } from '@react-icons/all-files/bs/BsPencilSquare';
import { Link } from 'react-router-dom';
import { BiLike } from '@react-icons/all-files/bi/BiLike';
import styled, { css } from 'styled-components';
import { updateRecommendationCount } from 'API/Firebase';
import userInfoState from 'Recoil/UserInfo';
import { useRecoilValue } from 'recoil';


const BookButtons = ({ detailInfo }) => {
  const [liked, setLiked] = useState(false);
  const [recommendationCount, setRecommendationCount] = useState(0);
  const bookId = detailInfo.isbn;

  const userInfo = useRecoilValue(userInfoState);
  const userId = userInfo ? userInfo.id : null;
  console.log(userId);

  const handleLikeButtonClick = async () => {
    try {
      // 추천 버튼
      setLiked(!liked);

      if (userId) {
        await updateRecommendationCount(userId, bookId, !liked);
        setRecommendationCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
      } else {
        console.error('로그인한 사용자 정보를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('추천 버튼 처리 중 오류:', error);
    }
  };

  const handleBookDownButtonClick = () => {
    // 책장 담기
  };
  return (
    <SLinkbox>
      <li>
        <SButton onClick={handleLikeButtonClick}>
          {liked ? <BiLike fill='var(--dark-purple)' /> : <BiLike />}
          <p>{recommendationCount}</p>
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
