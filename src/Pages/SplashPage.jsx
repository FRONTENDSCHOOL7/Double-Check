/* eslint-disable no-unused-vars */
import React from 'react';
import { useRecoilState } from 'recoil';
import { navBar } from 'Recoil/Navbar';
import { keyframes, styled } from 'styled-components';
import dbcBook from 'assets/images/character/dbc-book.svg';
import dbc from 'assets/images/character/dbc.svg';
import bgStart from 'assets/images/bg/bg-start.jpeg';
import logoWhite from 'assets/images/logo/logo-white.svg';
import dbc3 from 'assets/images/character/dbc3.svg';
import dbc2 from 'assets/images/character/dbc2.svg';
import bgSpace from 'assets/images/bg/bg-space.jpeg';

export default function SplashPage() {
  const [showNavBar, setShowNavBar] = useRecoilState(navBar);
  setShowNavBar(false);
  return (
    <Root>
      <Logo />
      <Character />
    </Root>
  );
}

const moveBackground = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 0;
  }
`;

const Root = styled.div`
  position: relative;
  height: 100vh;
  background-image: url(${bgSpace});
  background-size: auto 100%;
  animation: ${moveBackground} 30s linear infinite;
`;

const Logo = styled.div`
  width: 250px;
  height: 150px;
  background-image: url(${logoWhite});
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Character = styled.div`
  width: 200px;
  height: 200px;
  background-image: url(${dbc3});
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
