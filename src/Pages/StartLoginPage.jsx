import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PigCharacter from 'assets/images/userimage.png';
import bg from 'assets/images/bg.png';

function StartLoginPage() {
  return (
    <Container>
      {/* <BackGround /> */}
      <SLoginWrap>
        <Icon />
        <StyledLink to='/loginpage'>이메일로 로그인</StyledLink>
        <SignUpLink to='/signupPage'>회원가입</SignUpLink>
      </SLoginWrap>
    </Container>
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
  background-image: url(${bg});
  background-position: 40% -10%;
  background-size: 400px;
  background-repeat: no-repeat;
  margin: 0 auto;
  width: 390px;
  padding: 0;
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.div`
  width: 160px;
  height: 140px;
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
  background-color: #b29aff;
  color: white;
  text-decoration: none;
  border-radius: 15px;
  margin-bottom: 20px;
  font-size: var(--font-base-size);
`;

const SignUpLink = styled(Link)`
  // 회원가입 링크에 대한 스타일을 추가합니다.

  text-decoration: underline;
  color: black;
`;

export default StartLoginPage;
