import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

export default function BookListSkeleton() {
  const repeatCount = 10;

  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < repeatCount; i++) {
      skeletons.push(
        <SBookList key={i}>
          <Sli>
            <Skeleton height={210}>
              <SImgbox></SImgbox>
            </Skeleton>
            <StitleBox>
              <Skeleton height={16}></Skeleton>
            </StitleBox>
            <Stitle>
              <Skeleton width={130}></Skeleton>
            </Stitle>
            <Stitle>
              <Skeleton width={100}></Skeleton>
            </Stitle>
          </Sli>
        </SBookList>,
      );
    }
    return skeletons;
  };

  return <SBookLinkBox>{renderSkeletons()}</SBookLinkBox>;
}

const SBookLinkBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Stitle = styled.div`
  margin-top: 5px;
`;

const SBookList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 12px 18px;
`;

const Sli = styled.li`
  width: 150px;
  margin: 10px auto;
  position: relative;
`;

const SImgbox = styled.div`
  width: 150px;
  height: 210px;
`;

const StitleBox = styled.div`
  margin-top: 15px;
`;
