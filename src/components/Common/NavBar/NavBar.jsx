import React, { useEffect } from 'react';
import { NavBarWrapper, NavBarContents, NavItem, NavItemImg, NavItemTxt } from './NavBarStyle';
import { useLocation, Link } from 'react-router-dom';
import iconHome from '../../../assets/images/icon/icon-home.svg';
import iconHomeFill from '../../../assets/images/icon/icon-fill-home.svg';
import iconBook from '../../../assets/images/icon/icon-book.svg';
import iconBookFill from '../../../assets/images/icon/icon-fill-book.svg';
import iconPost from '../../../assets/images/icon/icon-post.svg';
import iconPostFill from '../../../assets/images/icon/icon-fill-post.svg';
import iconProfile from '../../../assets/images/icon/icon-profile.svg';
import iconProfileFill from '../../../assets/images/icon/icon-fill-profile.svg';

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
  { id: 3, name: '프로필', to: '/profile/myinfo', icon: iconProfile, iconFill: iconProfileFill },
];

const NavBarItem = ({ to, active, children }) => {
  return (
    <Link to={to}>
      <NavItem active={active} to={to}>
        {children}
      </NavItem>
    </Link>
  );
};

function NavBar() {
  const current = useLocation().pathname;

  useEffect(() => {
    console.log(`clicked: ${current}`);
  }, [current]);

  return (
    <NavBarWrapper>
      <NavBarContents>
        {navItem.map((item) => (
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
