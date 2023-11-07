import React from 'react';
import Logo1 from '../../assets/images/logo/logo1.png';
import Logo2 from '../../assets/images/logo/logo2.png';
import Logo3 from '../../assets/images/logo/logo3.png';
export const BannerData = [
  {
    img: Logo3,
    color: '#F2F6FF;',
    message: (
      <>
        인상깊었던 책의 글귀를 적고 <br /> 공유해보세요!
      </>
    ),
    linkTo: '/phrase/upload',
    size: 'big',
    btncolor: '#E1CAFF',
  },
  {
    img: Logo2,
    message: (
      <>
        다른 유저들은 어떤 책을 <br /> 읽고있을까요?
      </>
    ),
    color: '#FFF0F0',
    linkTo: '/post',
    size: 'big',
    btncolor: '#FFC7A7',
  },
  {
    img: Logo1,
    message: (
      <>
        {' '}
        최근 신작 <br /> 구경가보자고!
      </>
    ),
    color: ' #EFFFCD;',
    linkTo: '/book/newBooks',
    size: 'small',
    btncolor: '#A0FFC6',
  },
];
