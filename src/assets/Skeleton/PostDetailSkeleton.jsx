import React from 'react';

import 'react-loading-skeleton/dist/skeleton.css';
// import styled from 'styled-components';
import ContentLoader from 'react-content-loader';

const PostDetailSkeleton = (props) => (
  <>
    <ContentLoader
      speed={2}
      width={400}
      height={460}
      viewBox='0 0 400 460'
      backgroundColor='#e6e6e6'
      foregroundColor='#ecebeb'
      {...props}
    >
      <circle cx='38' cy='36' r='23' />
      <rect x='71' y='20' rx='5' ry='5' width='159' height='16' />
      <rect x='70' y='44' rx='5' ry='5' width='198' height='14' />
      <rect x='67' y='77' rx='5' ry='5' width='298' height='250' />
      <rect x='351' y='21' rx='5' ry='5' width='14' height='29' />
    </ContentLoader>
  </>
);

// const CommentForm = styled.form``;

// const CommentTextarea = styled`
//   width: 100%;
//   padding: 10px;
//   background-color: var(--gray-200);
//   border: none;
//   border-radius: 32px;
//   height: 41px;
//   font-family: 'Pretendard-regular', sans-serif;
//   font-size: var(--font-xs-size);
//   &::placeholder {
//     font-size: var(--font-xs-size);
//     padding: 0 7px;
//   }
//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;
export default PostDetailSkeleton;
