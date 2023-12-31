import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
export default function BookSlideItem({ title, author, cover, isbn }) {
  const newauthor = author.replace(/\([^)]*\)/g, '');
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/book/${isbn}`);
  };

  return (
    <SBookItemList onClick={handleClick}>
      <img
        src={cover}
        srcSet={`${cover} 110w`}
        sizes='(max-width:320px) 100px, 390px'
        alt={title}
        decoding='async'
      />
      <div>
        <strong>{title}</strong>
        <p>{newauthor}</p>
      </div>
    </SBookItemList>
  );
}

const SBookItemList = styled.div`
  cursor: pointer;
  width: 110px;
  height: 10;
  list-style: none;
  img {
    margin: 0 auto;
    display: block;
    width: 110px;
    aspect-ratio: 2/3;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    object-fit: cover;
  }
  div {
    margin-top: 10px;
  }
  strong,
  p {
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }
  p {
    font-size: 12px;
    color: var(--gray-500);
    margin-top: 6px;
  }
  strong {
    font-size: 15px;
  }
`;
