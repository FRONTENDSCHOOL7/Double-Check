import React from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const UserProfileSkeleton = () => {
  return <Skeleton borderRadius={15} width={45} height={45}></Skeleton>;
};

export default UserProfileSkeleton;
