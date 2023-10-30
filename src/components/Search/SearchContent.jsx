import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ImageCheck from '../Common/ImageCheck';
export default function SearchContent({ data, bookdata, filter, keyword }) {
  const HighlightSpan = styled.span`
    color: var(--dark-purple);
  `;

  const highlightKeyword = (text) => {
    if (keyword) {
      const regex = new RegExp(`(${keyword})`, 'gi');
      return text.split(regex).map((chunk, index) => {
        if (index % 2 === 1) {
          return <HighlightSpan key={index}>{chunk}</HighlightSpan>;
        } else {
          return chunk;
        }
      });
    }
    return text;
  };

  return (
    <SUl>
      {filter === 'user'
        ? data.map((item) => (
            <SLi key={item._id}>
              <SLink to={`/user/${item.username}`} className='user-link'>
                <SImgWrapper>
                  <img src={ImageCheck(item.image, 'profile')} alt='' />
                </SImgWrapper>
                <SDiv>
                  <strong>{highlightKeyword(item.username)}</strong>
                  <p>{highlightKeyword(item.accountname)}</p>
                </SDiv>
              </SLink>
            </SLi>
          ))
        : null}
      {filter === 'book'
        ? bookdata.map((item) => (
            <SLi key={item.isbn}>
              <SBook to={`/book/${item.isbn}`} className='book-link'>
                <BookimgWrapper>
                  <img src={item.image} alt={item.title} />
                </BookimgWrapper>
                <SBookDesBox>
                  <strong>{highlightKeyword(item.title)}</strong>
                  <p>{highlightKeyword(item.author)}</p>
                  <p>{highlightKeyword(item.publisher)}</p>
                </SBookDesBox>
              </SBook>
            </SLi>
          ))
        : null}
    </SUl>
  );
}

const SUl = styled.ul`
  margin-top: 10px;
`;

const SLi = styled.li`
  padding: 15px;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const SImgWrapper = styled.div`
  width: 50px;
  height: 50px;
`;

const SDiv = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  strong {
    font-size: medium;
    font-weight: 600;
    margin-bottom: 5px;
  }
  p {
    font-size: small;
    color: var(--gray-500);
  }
`;

const SLink = styled(Link)`
  display: flex;
`;

const SBook = styled(Link)`
  display: flex;
`;

const BookimgWrapper = styled.div`
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  img {
    border-radius: 0;
    width: 150px;
    object-fit: cover;
  }
`;

const SBookDesBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px 0px 15px;
  gap: 5px;
  strong {
    margin-bottom: 10px;
  }
  p {
    font-size: small;
    color: var(--gray-500);
  }
`;
