import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

export default function BookDetailSkeleton() {
  return (
    <>
      <SBookDetail>
        <SBookImg>
          <Skeleton width={200} height={250}></Skeleton>
        </SBookImg>
      </SBookDetail>
      <SDescContainer>
        <Stitle>
          <Skeleton width={200} height={20}></Skeleton>
        </Stitle>

        <SAuthor>
          <Skeleton width={100} height={15}></Skeleton>
        </SAuthor>

        <SCategorybox>
          <Skeleton width={70} height={30} borderRadius={50}></Skeleton>
          <Skeleton width={70} height={30} borderRadius={50}></Skeleton>
          <Skeleton width={70} height={30} borderRadius={50}></Skeleton>
          <Skeleton width={70} height={30} borderRadius={50}></Skeleton>
          <Skeleton width={70} height={30} borderRadius={50}></Skeleton>
          <Skeleton width={70} height={30} borderRadius={50}></Skeleton>
          <Skeleton width={70} height={30} borderRadius={50}></Skeleton>
        </SCategorybox>

        <SLinkbox>
          <Skeleton width={55} height={50} borderRadius={10}></Skeleton>
          <Skeleton width={55} height={50} borderRadius={10}></Skeleton>
          <Skeleton width={55} height={50} borderRadius={10}></Skeleton>
        </SLinkbox>
        <SDescWrapper>
          <Skeleton width={50} height={20}></Skeleton>
          <Skeleton width={300} height={20}></Skeleton>
          <Skeleton width={300} height={20}></Skeleton>
        </SDescWrapper>
      </SDescContainer>
    </>
  );
}

const SBookDetail = styled.div`
  display: flex;
  justify-content: center;
`;

const SBookImg = styled.div`
  width: 200px;
  height: 250px;
  transform: translateY(21px);
`;
const SDescContainer = styled.div`
  padding-top: 20px;
`;
const Stitle = styled.div`
  margin-top: 25px;
  text-align: center;
  padding: 0px 20px;
`;
const SAuthor = styled.div`
  margin-top: 20px;
  text-align: center;
  padding: 0px 20px;
`;

const SCategorybox = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0px 10px;
  gap: 8px;
  margin-top: 32px;
`;

const SLinkbox = styled.ul`
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 40px 0px;
`;
const SDescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-top: 12px solid var(--gray-200);
`;
