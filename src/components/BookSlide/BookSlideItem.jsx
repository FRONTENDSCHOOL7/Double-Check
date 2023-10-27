import React from 'react';
import styled from 'styled-components';
export default function BookSlideItem({ title, author, cover, desc }) {
  return (
    <SDiv>
      <img src={cover} alt={desc} />
      <div>
        <strong>{title}</strong>
        <p>{author}</p>
      </div>
    </SDiv>
  );
}
const SDiv = styled.div`
  flex-shrink: 0;
  width: 150px;
  height: 250px;
  margin: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 80%;
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
    margin: 6px 0 0 0;
    font-size: small;
  }
  strong {
    font-size: medium;
    font-weight: bold;
  }
`;
