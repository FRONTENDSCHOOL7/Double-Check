import React from 'react';
import styled from 'styled-components';

export default function Feed() {
  return <FollowerTitle>게시물</FollowerTitle>;
}

const FollowerTitle = styled.p`
  text-align: center;
  margin-top: 20px;
  padding: 13px 0;
  font-family: 'Pretendard-SemiBold', sans-serif;
  font-size: var(--font-base-size);
  border-top: ${(props) => (props.customStyle ? 'none' : 'solid 1px #e4e4e4')};
  border-bottom: ${(props) => (props.customStyle ? 'none' : 'solid 1px #e4e4e4')};
`;
