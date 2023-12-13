import React, { useState } from 'react';
import styled from 'styled-components';
import BookButtons from './BookButtons';
const MaxDescriptionLength = 200;

const BookDetailDesc = ({
  pubdates,
  modifiedAuthor,
  extractedTitle,
  subtitle,
  extractedPublisher,
  categoryName,
  description,
  isbn,
  publisher,
  detailInfo,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  let [title, rest] = extractedTitle.split(' - ');
  if (rest) {
    subtitle = rest;
    extractedTitle = title;
  }

  function BookCategories({ categoryName }) {
    if (!categoryName) {
      return null;
    }
    const categories = categoryName.split(/[>/]/);

    return (
      <SCategorybox>
        {categories.map((category, index) => (
          <SCategory key={index}>{category}</SCategory>
        ))}
      </SCategorybox>
    );
  }
  return (
    <SDescContainer>
      <Stitle>
        <h2>{extractedTitle}</h2>
        <p> {modifiedAuthor} 지음</p>
      </Stitle>
      {/* 책 카테고리 */}
      <BookCategories categoryName={categoryName} />
      {/* 버튼 컴포넌트 */}
      <BookButtons detailInfo={detailInfo} />
      {/* 책 소개 시작 */}
      <SDescWrapper>
        {!description ? (
          <SNoDesc>업데이트 중입니다. 조금만 기다려 주세요 : )</SNoDesc>
        ) : (
          <>
            <SBookInfo>책 소개</SBookInfo>
            <div>
              {subtitle && <strong>{subtitle}</strong>}
              <SBookDesc>
                {isExpanded ? description : description.slice(0, MaxDescriptionLength)}
              </SBookDesc>
            </div>
            {description && description.length >= 300 && (
              <MoreButton onClick={toggleExpansion}>
                {isExpanded ? '접어보기' : '더보기'}
              </MoreButton>
            )}
          </>
        )}
      </SDescWrapper>

      <SDescList>
        <li>
          <span>출판사</span> <p> {extractedPublisher ? extractedPublisher : publisher}</p>
        </li>

        <li>
          <span>출간일</span> <p>{pubdates ? pubdates : '업데이트 중'}</p>
        </li>
        <li>
          <span>ISBN </span>
          <p>{isbn}</p>
        </li>
      </SDescList>
    </SDescContainer>
  );
};

export default BookDetailDesc;

const SDescContainer = styled.div`
  padding-top: 20px;
  background-color: #fff;
  border-radius: 50px 50px 0px 0px;
`;

const Stitle = styled.div`
  margin-top: 25px;
  text-align: center;
  padding: 0px 20px;
  h2 {
    font-size: var(--font-sm-size);
    line-height: 1.3;
    font-weight: bold;
  }
`;
const SCategorybox = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0px 10px;
  gap: 8px;
  margin-top: 32px;
`;
const SCategory = styled.li`
  background-color: var(--light-purple);
  color: var(--dark-purple);
  padding: 10px 16px;
  font-size: 13px;
  border-radius: 50px;
`;

const SDescWrapper = styled.div`
  box-sizing: border-box;
  padding: 0px 20px;
  position: relative;
  border-top: 12px solid var(--gray-200);

  strong {
    margin: 12px 0px;
    font-size: var(--font-xs-size);

    box-shadow: inset 0 20px 0 var(--light-purple);
  }
  p {
    margin: 0;
  }
  div {
    display: flex;
    align-items: start;
    flex-direction: column;
    margin-top: 12px;
  }
`;
const SBookDesc = styled.p`
  line-height: 1.8;
`;
const MoreButton = styled.button`
  cursor: pointer;
  position: absolute;
  color: var(--dark-purple);
  right: 20px;
`;

const SDescList = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 10px;
  background-color: var(--gray-100);
  padding: 24px 0px;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
  }
`;

const SNoDesc = styled.cite`
  display: block;
  text-align: center;
  margin-top: 40px;
`;
const SBookInfo = styled.span`
  display: block;
  font-size: var(--font-xs-size);
  font-weight: bold;
  margin-top: 20px;
`;
