import React, { useState } from 'react';
import styled from 'styled-components';
import Topbar from 'components/Common/Topbar/Topbar';
import { BsPencilSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const MaxDescriptionLength = 200;

const BookDetail = ({ book }) => {
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
  console.log(book);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const reviewButton = (
    <SLink to='/post/upload' state={book}>
      <BsPencilSquare />
    </SLink>
  );

  const bookImage = image || cover;
  const pubdates = pubdate || pubDate;
  const categoryNameSplit = categoryName ? categoryName.split('>') : [];
  const lastCategory = categoryNameSplit.length > 0 ? categoryNameSplit.pop().trim() : '';
  const modifiedAuthor = author.replace(/\^/g, ', ');
  return (
    <Ssection>
      {/* <Topbar customStyle={true} rightEl='review' book={book} /> */}
      <Topbar title rightButton={reviewButton} />

      <SBookDetail>
        <h1>도서 상세 정보</h1>
        <SBookImg>
          <img src={bookImage} alt={title} />
        </SBookImg>
      </SBookDetail>
      <SDescContainer>
        <Stitle>
          <h2>{title}</h2>
          <p> {modifiedAuthor}</p>
        </Stitle>

        <SInfoBox>
          {categoryName && (
            <li>
              카테고리 <p>{lastCategory}</p>
            </li>
          )}
          <li>
            출판사 <p> {publisher}</p>
          </li>
          <li>
            ISBN<p>{isbn}</p>
          </li>
          <li>
            출간일
            <p>{pubdates}</p>
          </li>
        </SInfoBox>

        <SDescWrapper>
          {!description ? (
            <Description>업데이트 중입니다. 조금만 기다려 주세요 : )</Description>
          ) : (
            <Description>
              책 소개
              <p>{isExpanded ? description : description.slice(0, MaxDescriptionLength)}</p>
            </Description>
          )}
          {description && description.length >= 300 && (
            <MoreButton onClick={toggleExpansion}>{isExpanded ? '접어보기' : '더보기'}</MoreButton>
          )}
        </SDescWrapper>
      </SDescContainer>
    </Ssection>
  );
};

const Description = styled.span`
  display: block;
`;
const Ssection = styled.section`
  position: relative;

  p {
    color: var(--gray-500);
    font-size: small;
    line-height: 1.8;
    margin-top: 10px;
  }
`;

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

const SInfoBox = styled.ul`
  background-color: var(--light-orange);
  text-align: center;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  span {
    font-size: medium;
  }
`;

const SDescWrapper = styled.div`
  padding: 20px;
  position: relative;
  width: 390px;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis; // 말줄임표를 표시
`;

const MoreButton = styled.button`
  cursor: pointer;
  position: absolute;
  color: var(--dark-purple);
  right: 30px;
`;

const SLink = styled(Link)`
  text-decoration: none;
  border-radius: 50%;
  background-color: #e5daff;
  cursor: pointer;
  display: block;
  width: ${(props) => (props.home ? '200px' : '50px')};
  height: ${(props) => (props.home ? '' : '50px')};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

export default BookDetail;
