import React from 'react';
import Logo1 from '../../assets/images/logo/logo1.svg';
import Logo2 from '../../assets/images/logo/logo2.svg';
import Logo3 from '../../assets/images/logo/logo3.svg';
export const BannerData = [
  {
    img: Logo3,
    color: '#fff;',
    message: (
      <>
        인상깊었던 책의 글귀를 적고 <br /> 공유해보세요!
      </>
    ),
    linkTo: '/phraseupload',
  },
  {
    img: Logo1,
    message: (
      <>
        다른 유저들은 어떤 책을 <br /> 읽고있을까요?
      </>
    ),
    color: '#FFF0F0',
    linkTo: '/looaround',
  },
  {
    img: Logo2,
    message: <> 최근 신작 책 구경가보자고~</>,
    color: ' #F2F6FF;',
    linkTo: 'book/newBooks',
  },
];
