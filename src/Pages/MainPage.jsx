import React from 'react';
import MainTopBar from 'components/MainTopBar';
import ManuTab from 'components/ManuTab';
import BestPost from 'components/BestItem/BestPost';
import BestBook from 'components/BestItem/BestBook';

const MainPage = () => {
  return (
    <>
      <MainTopBar />
      <ManuTab />
      <BestPost />
      <BestBook />
    </>
  );
};

export default MainPage;
