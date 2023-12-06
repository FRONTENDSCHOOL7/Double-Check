import React, { Suspense, lazy } from 'react';
import MainTopBar from 'components/MainTopBar';
import ManuTab from 'components/ManuTab';

const BestPost = lazy(() => import('components/BestItem/BestPost'));
const BestBook = lazy(() => import('components/BestItem/BestBook'));

const MainPage = () => {
  return (
    <>
      <MainTopBar />
      <ManuTab />
      <Suspense fallback={<div>Loading...</div>}>
        <BestPost />
        <BestBook />
      </Suspense>
    </>
  );
};

export default MainPage;
