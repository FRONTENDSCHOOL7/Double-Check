/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { navBar } from 'Recoil/Navbar';
import { keyframes, styled } from 'styled-components';
import dbcBook from 'assets/images/character/dbc-book.svg';
import dbc from 'assets/images/character/dbc.svg';
import bgStart from 'assets/images/bg/bg-start.jpeg';
import logoWhite from 'assets/images/logo/logo-white2.svg';
import dbc3 from 'assets/images/character/dbc3.svg';
import dbc2 from 'assets/images/character/dbc2.svg';
import bgSpace from 'assets/images/bg/bg-space.jpeg';
import { useNavigate } from 'react-router-dom';
import Logo1 from '../assets/images/logo/logo3.png';
export default function SplashPage() {
  const [showNavBar, setShowNavBar] = useRecoilState(navBar);
  const navigate = useNavigate();

  useEffect(() => {
    const navigateTimeout = setTimeout(() => {
      navigate('/main');
    }, 3000);

    return () => {
      clearTimeout(navigateTimeout);
    };
  }, [navigate]);

  setShowNavBar(false);
  return (
    <SplashWrapper className={fadeOut ? 'fade-out' : ''}>
      <Root>
        <Logo />
        <Character />
      </Root>
    </SplashWrapper>
  );
}

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.9;
  }
`;
const moveBackground = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 0;
  }
`;

const SplashWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &.fade-out {
    opacity: 0;
    animation: ${fadeOut} 2s linear forwards;
  }
`;

const Root = styled.div`
  margin: 0 auto;
  width: 390px;
  padding: 0;
  position: relative;
  min-height: 100vh;
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
  width: 250px;
  height: 250px;
  background-image: url(${Logo1});
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-45%, -50%);
`;
