import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PigCharacter from 'assets/images/PigCharacter.png';
import bg from 'assets/images/bg.png';

function StartLoginPage() {
  return (
    <Container>
      <BackGround />
      <Icon />
      <StyledLink to='/loginpage'>이메일로 로그인</StyledLink>
      <SignUpLink to='/signupPage'>회원가입</SignUpLink>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100vh;
  width: 390px;
  overflow: hidden;
`;

const BackGround = styled.div`
  position: fixed;
  top: -50px;
  width: 390px;
  height: 300px;
  background-image: url(${bg});
  background-size: cover;
  margin-bottom: 50px;
`;

const Icon = styled.div`
  width: 160px;
  height: 140px;
  background-image: url(${PigCharacter});
  background-size: cover;
  margin-top: 300px;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 298px;
  height: 50px;
  margin-top: 51px;
  background-color: #b29aff;
  color: white;
  text-decoration: none;
  border-radius: 15px;
  margin-bottom: 20px;
  font-size: var(--font-base-size);
`;

const SignUpLink = styled(Link)`
  // 회원가입 링크에 대한 스타일을 추가합니다.
  position: absolute;
  bottom: 100px;
  text-decoration: underline;
  color: black;
`;

export default StartLoginPage;
