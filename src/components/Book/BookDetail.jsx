/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line react/prop-types
export default function BookDetail({ book }) {
  const { title, image, publisher, author, description } = book;
  return (
    <div>
      <h1>도서 상세 정보</h1>
      <div>
        <img src={image} alt={title} />
        <h2>도서 이름: {title}</h2>
        <p>출판사: {publisher}</p>
        <span>저자: {author}</span>
        <p>상세 설명: {description}</p>
      </div>
    </div>
  );
}
