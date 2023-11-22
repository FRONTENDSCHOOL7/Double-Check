/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BannerSlideShow from 'components/Banner/BannerSlideEffect';
import BookSlide from 'components/BookSlide/BookSlide';
import Topbar from 'components/Common/Topbar/Topbar';
import TopBarBtn from 'components/Common/Topbar/TopBarBtn';

import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import Button from 'components/Common/Button/Button';
import { Suspense } from 'react';
import loginToken from 'Recoil/LoginToken';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginCheck } from 'Recoil/LoginCheck';
import HamSideYesLogin from 'components/Common/HamSideBar/HamSideYesLogin';
import HamSideNoLogin from 'components/Common/HamSideBar/HamSideNoLogin';
import MainSkeleton from 'assets/Skeleton/MainSkeleton';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { navBar } from '../Recoil/Navbar';
export default function MainPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [showNavBar, setShowNavBar] = useRecoilState(navBar);
  setShowNavBar(true);

  return (
    <>
      <Topbar
        leftButton={
          <TopBarBtn
            // 로그아웃 버튼을 눌렀을 때 token 상태가 변경됨을 인지하지 못해 key값으로 언마운트 마운트를 통해 새로 렌더링하게 함
            key={token ? 'loggedIn' : 'loggedOut'} // key prop 추가
            icon={token ? HamSideYesLogin : HamSideNoLogin}
          />
        }
        rightButton={<TopBarBtn icon={BiSearch} onClick={() => navigate('/search')} />}
      />
      <BannerSlideShow />
      <Suspense fallback={<MainSkeleton />}>
        <BookSlide
          title='베스트 셀러'
          dataType='bestsellers'
          desc='최근 1주 동안 많은 고객들이 찾은 도서 순위!!'
          path='/book/bestseller'
        />
        <BookSlide
          title='신간 도서 리스트'
          dataType='newBooks'
          desc='오늘의 독서, 어떤 책을 읽을까요?'
          path='/book/newBooks'
        />
        <BookSlide
          title='이번달 신간 리스트'
          dataType='newBookSpecial'
          desc='독서 트렌드 따라잡기'
          path='/book/NewBookSpecial'
        />
      </Suspense>
    </>
  );
}
