/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PigCharacter from 'assets/images/logo/logo4.png';
import Bg from '../assets/images/bg/bg-white-space.svg';

function StartLoginPage() {
  return (
    <>
      {/* <BackGround /> */}
      <BgImg />
      <SLoginWrap>
        <Icon />
        <StyledLink to='/loginpage'>이메일로 로그인</StyledLink>
        <SignUpLink to='/signupPage'>회원가입</SignUpLink>
      </SLoginWrap>
    </>
  );
}
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const SLoginWrap = styled.div`
  margin: 0 auto;
  width: 390px;
  padding: 0;
  position: relative;
  /* min-height: 100vh; */
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.div`
  width: 50%;
  height: 179px;
  background-image: url(${PigCharacter});
  background-size: cover;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 298px;
  height: 50px;
  margin-top: 51px;
  background-color: var(--main-purple);
  color: var(--white);
  text-decoration: none;
  border-radius: 15px;
  margin-bottom: 20px;
  font-size: var(--font-base-size);
`;

const SignUpLink = styled(Link)`
  text-decoration: underline;
  color: var(--black);
`;

const BgImg = styled.div`
  position: absolute;
  top: 0;
  width: inherit;
  height: 181px;
  background-image: url(${Bg});
  overflow: hidden;
  background-size: cover;
  background-position: center;
`;

export default StartLoginPage;
