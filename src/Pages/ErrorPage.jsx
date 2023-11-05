/* eslint-disable no-unused-vars */
import React from 'react';
import { useRecoilState } from 'recoil';
import { navBar } from 'Recoil/Navbar';
import { keyframes, styled } from 'styled-components';
import logo3 from 'assets/images/logo/logo3.png';
import bgError from 'assets/images/bg/bg-404.svg';
import errorMsg from 'assets/images/404.svg';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const [showNavBar, setShowNavBar] = useRecoilState(navBar);
  const navigate = useNavigate();
  setShowNavBar(false);
  const goHomeBtn = () => {
    navigate('/');
  };
  return (
    <Root>
      <ErrorMsg />
      <ErrorText1>Oops, you’ve lost in space</ErrorText1>
      <ErrorText2>We can’t find the page that you’re looking for</ErrorText2>
      <Character />
      <Button onClick={goHomeBtn}>Go home</Button>
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
  transform: translate(-50%, -50%) rotate(-20deg);
}
100%{
  transform: translate(-50%, -50%) rotate(20deg);
}
`;

const Button = styled.button`
  width: 150px;
  height: 60px;
  border-radius: 60px;
  background: #6a63fe;
  color: #fff;
  font-family: Poppins;
  font-size: 25px;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ErrorText1 = styled.h1`
  position: relative;
  top: 55%;
  text-align: center;
  color: #fff;
  font-family: Poppins;
  font-size: 17px;
  font-weight: 600;
  line-height: normal;
`;

const ErrorText2 = styled.h2`
  position: relative;
  top: 56%;
  text-align: center;
  color: #fff;
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
`;

const ErrorMsg = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${errorMsg});
  background-repeat: no-repeat;
  background-size: contain;
`;

const Root = styled.div`
  position: relative;
  height: 100vh;
  background-image: url(${bgError});
  background-size: auto 100%;
  animation: ${moveBackground} 90s linear infinite;
`;

const Character = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${logo3});
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  top: 27%;
  left: 55%;
  transform: translate(-50%, -50%);
  animation: ${rotate} 2s alternate infinite;
`;
