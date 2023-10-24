/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

export default function BookList({ product }) {
  // `product` 객체에서 도서 정보 추출
  const { isbn13, cover, title, author } = product;

  return (
    <>
      <li key={isbn13}>
        <Link to={`/book/${isbn13}`} state={product}>
          <div>
            <img src={cover} alt={title} />
          </div>
          <div>
            <h2>제목: {title}</h2>
            <p>저자: {author}</p>
          </div>
        </Link>
      </li>
    </>
  );
}
