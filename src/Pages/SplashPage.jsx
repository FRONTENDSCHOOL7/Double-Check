/* eslint-disable no-unused-vars */
import React from 'react';
import { useRecoilState } from 'recoil';
import { navBar } from 'Recoil/Navbar';
import { keyframes, styled } from 'styled-components';
import logoWhite from 'assets/images/logo/logo-white.svg';
import bgSpace from 'assets/images/bg/bg-space.jpeg';
import logo1 from 'assets/images/logo/logo1.png';
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

const rotate = keyframes` 
0%{
  transform: translate(-50%, -50%) rotate(-0deg);
}
100%{
  transform: translate(-50%, -50%) rotate(30deg);
}
`;

const Root = styled.div`
  position: relative;
  height: 100vh;
  background-image: url(${bgSpace});
  background-size: auto 100%;
  animation: ${moveBackground} 20s linear infinite;
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
  background-image: url(${logo1});
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center;
  animation: ${rotate} 2s alternate infinite;
`;
