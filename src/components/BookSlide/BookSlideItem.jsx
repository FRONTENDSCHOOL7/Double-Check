import React from 'react';
import styled from 'styled-components';

import 'react-loading-skeleton/dist/skeleton.css';
export default function BookSlideItem({ title, author, cover, desc }) {
  return (
    <SDiv>
      <SImgWrapper>
        <img src={cover} alt={desc} />
      </SImgWrapper>
      <div>
        <strong>{title}</strong>
        <p>{author}</p>
      </div>
    </SDiv>
  );
}
const SDiv = styled.div`
  width: 110px;
  margin: 5px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    object-fit: cover;
  }
  div {
    margin-top: 20px;
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
const SImgWrapper = styled.div`
  width: 100%;
  height: 150px;
`;
