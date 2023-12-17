import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const itemCount = 3;
const repetitionCount = 3;

function SkeletonContainer() {
  return (
    <>
      <STitleBox>
        <Skeleton width={90} height={15} />
        <SInfo>
          <Skeleton height={13} width={200} />
        </SInfo>
      </STitleBox>
      <SContainer>
        {Array.from({ length: itemCount }, (_, index) => (
          <SDiv key={index}>
            <Skeleton width={110} height={165} borderRadius={10} />
            <SDivTitle>
              <Skeleton width={110} height={14} />
              <Skeleton width={90} height={10} />
            </SDivTitle>
          </SDiv>
        ))}
      </SContainer>
    </>
  );
}

export default function MainSkeleton() {
  return (
    <>
      {Array.from({ length: repetitionCount }, (_, index) => (
        <SkeletonContainer key={index} />
      ))}
    </>
  );
}

const SContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const SInfo = styled.div`
  margin-top: 6px;
`;

const STitleBox = styled.div`
  margin: 24px 15px;
`;
const SDivTitle = styled.div`
  margin-top: 30px;
`;
const SDiv = styled.div`
  width: 110px;
`;
