/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
export default function BookList({ product }) {
  // `product` 객체에서 도서 정보 추출
  const { isbn13, cover, title, author } = product;

  return (
    <>
      <SLi key={isbn13}>
        <SLink to={`/book/${isbn13}`} state={product}>
          <div>
            <SImgStyle src={cover} alt={title} />
          </div>
          <div>
            <SH2> {title}</SH2>
            <SSpan> {author}</SSpan>
          </div>
        </SLink>
      </SLi>
    </>
  );
}
const SImgStyle = (styled.img = `

  `);

const SLi = styled.li``;

const SLink = styled(Link)``;

const SH2 = styled.h2``;
const SSpan = styled.span``;
