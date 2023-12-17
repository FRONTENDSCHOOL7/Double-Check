import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

export default function MainPostSkeleton() {
  return (
    <>
      <SPostList>
        <SPostItem>
          <Skeleton height={370}></Skeleton>
        </SPostItem>
        <SPostItem>
          <Skeleton height={370}></Skeleton>
        </SPostItem>
      </SPostList>
    </>
  );
}

const SPostList = styled.ul`
  display: flex;
  gap: 10px;
`;

const SPostItem = styled.li`
  width: 300px;
`;
