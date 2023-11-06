import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function PhraseListSkeleton() {
  const numberOfSkeletons = 10;
  return (
    <PhraseContainer>
      {Array.from({ length: numberOfSkeletons }).map((_, index) => (
        <PhraseContents key={index}>
          <Skeleton width={350} height={140} borderRadius={12}></Skeleton>
        </PhraseContents>
      ))}
    </PhraseContainer>
  );
}

const PhraseContainer = styled.section`
  font-family: 'Pretendard-Regular', sans-serif;
  padding: 20px 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const PhraseContents = styled.div`
  margin-bottom: 22px;
`;
