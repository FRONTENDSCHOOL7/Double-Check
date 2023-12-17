import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ImageCheck from 'components/Common/ImageCheck';
import useTimeSince from 'Hooks/useTimeSince';
import { SPostHeader, SProfileImg, SPostSpan, SShowMore } from '../Post/PostStyle';

const BestPostItem = ({ color, item }) => {
  const author = item.parsedContent.author.replace(/\^/g, ',');
  const title = item.parsedContent.title.replace(/\([^()]*\)/g, '');
  const timeSincePosted = useTimeSince(item.createdAt);
  console.log(item.parsedContent.isbn);

  return (
    <>
      <Article key={item._id}>
        {/* 계정 정보 */}
        <SSPostHeader>
          <SProfileImg src={ImageCheck(item.author.image, 'profile')} alt='유저 프로필 사진' />

          <SLink to={`/profile/${item.author.accountname}`}>
            <SPostSpan>{item.author.username}</SPostSpan>
            <p>{timeSincePosted}</p>
          </SLink>
          <SShowMore></SShowMore>
        </SSPostHeader>
        {/* 내용 */}
        <SBody color={color}>
          <Link to={`/post/${item._id}`}>
            <Desc>
              <SPostReview>{item.parsedContent.review}</SPostReview>
            </Desc>
          </Link>

          <Link to={`/book/${item.parsedContent.isbn}`}>
            <SBookDesc>
              <div>
                <h3>{title}</h3>
                <p>{author} 지음</p>
              </div>
              <Img src={item.image} />
            </SBookDesc>
          </Link>
        </SBody>
      </Article>
    </>
  );
};

export default BestPostItem;

const SBody = styled.div`
  height: 80%;
  background: ${(props) =>
    Array.isArray(props.color)
      ? `linear-gradient(${props.color[0]}, ${props.color[1]})`
      : props.color};
`;
const SSPostHeader = styled(SPostHeader)`
  padding: 15px;
  height: 20%;
  border-radius: 8px 8px 0 0;
`;

const Article = styled.article`
  height: 100%;
  min-width: 300px;
  display: flex;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: inline-block;
  box-sizing: border-box;

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: var(--font-xxs-size);
    color: var(--gray-500);
  }
`;

const SLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: var(--gray-500);

  & > span:first-of-type {
    color: var(--black);
  }
`;
const SBookDesc = styled.div`
  display: flex;
  backdrop-filter: blur(5px); /* 배경 흐리게 */
  background-color: rgba(255, 255, 255, 0.5); /* 투명 배경색 */
  height: 30%;
  justify-content: space-between;
  /* padding: 10px 10px 0px 10px; */
  padding: 3px 8px 2px 20px;
  width: 100%;
  div {
    width: 190px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }
  h3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 1.3;
    font-size: 14px;
    /* height: calc(1em * 1.6 * 2); */
  }
`;

const Img = styled.img.attrs({ alt: '책 이미지' })`
  width: 60px;
  height: 85px;
  object-fit: cover;
`;

const Desc = styled.div`
  line-height: 1.4;
  padding: 40px 20px 0px 20px;
  height: 70%;

  h2 {
    font-size: 1.2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
const SPostReview = styled.span`
  font-family: 'Pretendard-regular', sans-serif;
  font-size: var(--font-xs-size);
  line-height: 1.6;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
`;
