import React, { useEffect } from 'react';
import {
  NavBarWrapper,
  NavBarContents,
  NavItem,
  NavItemImg,
  NavItemTxt,
  NavLink,
} from './NavBarStyle';
import { useLocation } from 'react-router-dom';
import iconHome from '../../../assets/images/icon/icon-home.svg';
import iconHomeFill from '../../../assets/images/icon/icon-fill-home.svg';
import iconBook from '../../../assets/images/icon/icon-book.svg';
import iconBookFill from '../../../assets/images/icon/icon-fill-book.svg';
import iconPost from '../../../assets/images/icon/icon-post.svg';
import iconPostFill from '../../../assets/images/icon/icon-fill-post.svg';
import iconProfile from '../../../assets/images/icon/icon-profile.svg';
import iconProfileFill from '../../../assets/images/icon/icon-fill-profile.svg';

import userInfoState from 'Recoil/UserInfo';
import { useRecoilValue } from 'recoil';

const navItem = [
  { id: 0, name: '홈', to: '/main', icon: iconHome, iconFill: iconHomeFill },
  {
    id: 1,
    name: '피드',
    to: '/post',
    icon: iconPost,
    iconFill: iconPostFill,
  },
  { id: 2, name: '책장', to: '/phraselist', icon: iconBook, iconFill: iconBookFill },
  {
    id: 3,
    name: '프로필',
    to: `/profile/`,
    icon: iconProfile,
    iconFill: iconProfileFill,
  },
];

const NavBarItem = ({ to, active, children }) => {
  return (
    <NavItem to={to}>
      <NavLink $active={active} to={to}>
        {children}
      </NavLink>
    </NavItem>
  );
};

function NavBar() {
  const current = useLocation().pathname;
  const UserInfo = useRecoilValue(userInfoState);
  useEffect(() => {
    console.log(`clicked: ${current}`);
  }, [current]);
  const updatedNavItem = navItem.map((item) => {
    console.log(item);
    if (item.id === 3) {
      return {
        ...item,
        to: UserInfo && UserInfo.accountname ? `/profile/${UserInfo.accountname}` : '/profile',
      };
    }
    if (item.id === 0 && (current === '/search' || current === '/book/bestseller')) {
      return {
        ...item,
        icon: iconHomeFill, // 여기에서 기본 이미지를 고정
      };
    }
    return item;
  });
  return (
    <NavBarWrapper>
      <NavBarContents>
        {updatedNavItem.map((item) => (
          <NavBarItem key={item.id} to={item.to} active={item.to === current ? 'true' : 'false'}>
            <NavItemImg
              src={item.to === current ? item.iconFill : item.icon}
              alt='네비게이션 아이콘'
              to={item.to}
            />
            <NavItemTxt>{item.name}</NavItemTxt>
          </NavBarItem>
        ))}
      </NavBarContents>
    </NavBarWrapper>
  );
}

export default React.memo(NavBar);
