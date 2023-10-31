import React, { useState } from 'react';
import styled from 'styled-components';
import Topbar from 'components/Common/TopBar';
const MaxDescriptionLength = 200;

const BookDetail = ({ book }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const {
    title,
    image,
    cover,
    publisher,
    author,
    categoryName,
    pubDate,
    isbn,
    pubdate,
    description,
  } = book;

  const bookImage = image || cover;
  const pubdates = pubdate || pubDate;
  const categoryNameSplit = categoryName ? categoryName.split('>') : [];
  const lastCategory = categoryNameSplit.length > 0 ? categoryNameSplit.pop().trim() : '';

  return (
    <Ssection>
      <Topbar customStyle={true} />
      <SBookDetail>
        <h1>도서 상세 정보</h1>
        <SBookImg>
          <img src={bookImage} alt={title} />
        </SBookImg>
      </SBookDetail>
      <SDescContainer>
        <Stitle>
          <h2>{title}</h2>
          <p> {author}</p>
        </Stitle>

        <SInfoBox>
          <span>
            카테고리 <p>{lastCategory}</p>
          </span>
          <span>
            출간일
            <p>{pubdates}</p>
          </span>
          <span>
            ISBN<p>{isbn}</p>
          </span>
          <span>
            출판사 <p> {publisher}</p>
          </span>
        </SInfoBox>
        <SDescWraaper>
          <Description>
            책 소개
            <p>{isExpanded ? description : description.slice(0, MaxDescriptionLength)}</p>
          </Description>
          <MoreButton onClick={toggleExpansion}>{isExpanded ? '접어보기' : '더보기'}</MoreButton>
        </SDescWraaper>
      </SDescContainer>
    </Ssection>
  );
};

const Ssection = styled.section`
  p {
    color: var(--gray-500);
    font-size: small;
    line-height: 1.8;
    margin-top: 10px;
  }
`;

// 나머지 스타일 컴포넌트 정의는 여기에 있습니다.

const SBookDetail = styled.div`
  padding: 30px 30px 45px 30px;
  display: flex;
  justify-content: center;
  background-color: var(--light-purple);
  h1 {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`;

const SDescContainer = styled.div``;

const Stitle = styled.div`
  padding: 20px;
  h2 {
    font-size: large;
    margin-bottom: 10px;
    line-height: 1.3;
    font-weight: bold;
  }
`;

const SBookImg = styled.div`
  width: 200px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  img {
    width: 100%;
  }
`;

const SInfoBox = styled.div`
  background-color: var(--light-orange);
  text-align: center;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  span {
    font-size: medium;
  }
`;

const SDescWraaper = styled.div`
  padding: 20px;
  position: relative;
`;

const Description = styled.span`
  display: block;
`;

const MoreButton = styled.button`
  cursor: pointer;
  position: absolute;
  color: var(--dark-purple);
  right: 30px;
`;

export default BookDetail;
