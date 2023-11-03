/* eslint-disable no-unused-vars */
import React from 'react';
import BannerSlideShow from 'components/Banner/BannerSlideEffect';
import BookSlide from 'components/BookSlide/BookSlide';
import Topbar from 'components/Common/Topbar/Topbar';
import TopBarBtn from 'components/Common/TopBarBtn';
import HamSideNoLogin from 'components/Common/HamSideBar/HamSideNoLogin';
import { useNavigate } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import Button from 'components/Common/Button/Button';
import { Suspense } from 'react';
import loginToken from 'Recoil/LoginToken';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginCheck } from 'Recoil/LoginCheck';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <>
      <Topbar
        leftButton={<TopBarBtn icon={HamSideNoLogin} />}
        rightButton={<TopBarBtn icon={BiSearchAlt} onClick={() => navigate('/search')} />}
      />
      <BannerSlideShow />
      <Suspense fallback={<div>loading...</div>}>
        <BookSlide
          title='베스트 셀러'
          dataType='bestsellers'
          desc='최근 1주 동안 많은 고객들이 찾은 도서 순위!!'
          path='book/bestseller'
        />
        <BookSlide title='신간 도서 리스트' dataType='newBooks' path='book/newBooks' />
        <BookSlide
          title='이번달 주목할 만한 도서'
          dataType='newBookSpecial'
          desc='독서 트렌드 따라잡기'
          path='book/NewBookSpecial'
        />
      </Suspense>
    </>
  );
}
