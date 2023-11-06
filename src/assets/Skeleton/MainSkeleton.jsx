import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const itemCount = 4;
const repetitionCount = 3;

function SkeletonContainer() {
  return (
    <SSliderContainer>
      <STitleBox>
        <Skeleton width={360} height={15} />
        <SInfo>
          <Skeleton height={13} width={200} />
        </SInfo>
      </STitleBox>
      <SContainer>
        {Array.from({ length: itemCount }, (_, index) => (
          <SDiv key={index}>
            <SImgWrapper>
              <Skeleton height={150} borderRadius={10} />
            </SImgWrapper>
            <SDivTitle>
              <Skeleton width={110} height={14} />
              <Skeleton width={110} height={10} />
            </SDivTitle>
          </SDiv>
        ))}
      </SContainer>
    </SSliderContainer>
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
`;
const SInfo = styled.div`
  margin-top: 6px;
`;
const SSliderContainer = styled.section``;

const STitleBox = styled.div`
  margin: 24px 15px;
`;
const SDivTitle = styled.div`
  margin-left: 10px;
  margin-top: 20px;
`;
const SDiv = styled.div`
  width: 110px;
  margin-left: 10px;
  margin: 5px;
`;
const SImgWrapper = styled.div`
  width: 100%;
  height: 150px;
  margin-left: 10px;
`;
