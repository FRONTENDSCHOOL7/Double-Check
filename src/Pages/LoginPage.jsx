/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-prototype-builtins */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import { loginAPI } from 'API/User';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginCheck } from 'Recoil/LoginCheck';
import loginToken from 'Recoil/LoginToken';
import { navBar } from 'Recoil/Navbar';
import { styled } from 'styled-components';
import { ReactComponent as Doublecheck } from '../assets/images/logo/logo6.svg';
// import Bg from '../assets/images/bg/bg-white-space.svg';
import Button from 'components/Common/Button/Button';
import accountname from 'Recoil/Accountname';
import iconUnchecked from '../assets/images/icon/icon-unchecked.svg';
import iconChecked from '../assets/images/icon/icon-checked.svg';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showNavBar, setShowNavBar] = useRecoilState(navBar);
  const [userErrorMessage, setUserErrorMessage] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [isLoginCheck, setIsLoginCheck] = useRecoilState(loginCheck);
  const [token, setToken] = useRecoilState(loginToken);
  const [valid, setValid] = useState(false);
  const [nonMembersMode, setNonMembersMode] = useState(false);
  const [accountName, setAccountName] = useRecoilState(accountname);

  const [loginData, setLoginData] = useState({
    user: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isLoginCheck) {
      navigate('/main');
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
    handleError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValid(handleError);
    if (valid) {
      await handleLogin();
    }
  };

  const handleLogin = async () => {
    const response = await loginAPI(loginData);
    if (response && response.hasOwnProperty('user')) {
      const newToken = response.user.token;
      setIsLoginCheck(true);
      localStorage.setItem('token', newToken);
      setAccountName(response.user.accountname);
      setToken(newToken);
      navigate('/main');
    } else if (response.status === 422) {
      setErrorMessage('이메일 또는 비밀번호가 일치하지 않습니다.');
    } else {
      const errorMessage = response && response.message ? response.message : handleError();
      setErrorMessage(errorMessage);
    }
  };

  const handleError = () => {
    const errors = [];
    setErrorMessage('');
    if (loginData.user.email === '') {
      setValid(false);
    } else if (loginData.user.password === '') {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const handleNonMembersMode = () => {
    setNonMembersMode((prevNonMembersMode) => !prevNonMembersMode);
    setValid(true);
  };

  useEffect(() => {
    if (nonMembersMode) {
      setLoginData((prevState) => ({
        user: {
          ...prevState.user,
          email: 'developer@test.com',
          password: '123123',
        },
      }));
    } else {
      setLoginData((prevState) => ({
        user: {
          ...prevState.user,
          email: '',
          password: '',
        },
      }));
    }
  }, [nonMembersMode]);

  return (
    <>
      <BgImg />
      <LogoBox>
        <Logo />
      </LogoBox>
      <LoginBox>
        <form onSubmit={handleSubmit}>
          <InputDiv>
            <Label htmlFor='emailInput'>이메일</Label>
            <InputBox
              type='email'
              id='emailInput'
              name='email'
              placeholder='이메일 입력'
              onChange={handleInputChange}
              value={loginData.user.email}
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor='passwordInput'>비밀번호</Label>
            <InputBox
              type='password'
              name='password'
              id='passwordInput'
              placeholder='비밀번호 입력'
              onChange={handleInputChange}
              value={loginData.user.password}
            />
            {errorMessage && loginData.user.email && loginData.user.password && (
              <ErrorMassage>{errorMessage}</ErrorMassage>
            )}
          </InputDiv>

          <TestAccountButton type='button' onClick={handleNonMembersMode}>
            {/* 체크박스 아이콘 */}
            <Icon
              src={nonMembersMode ? iconChecked : iconUnchecked}
              alt={nonMembersMode ? '체험하기 버튼 활성화' : '체험하기 버튼 비활성화'}
            />
            테스트 계정으로 시작하기
          </TestAccountButton>

          <Button
            category='basic'
            shape='big'
            type='submit'
            onClick={valid ? handleLogin : undefined}
            disabled={!valid}
          >
            로그인
          </Button>
        </form>
        <SignUpLink to='/signupPage'>회원가입</SignUpLink>
      </LoginBox>
    </>
  );
}

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

const LoginBox = styled.div`
  padding: 0 49px;
`;

const Label = styled.label`
  margin-bottom: 9px;
  color: var(--dark-purple);
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 100% */
`;

const ErrorMassage = styled.div`
  padding: ${(props) => (props.isVisible ? '10px 10px 0' : '0')};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  color: var(--dark-orange);
  font-size: 14px;
`;

const InputBox = styled.input`
  height: 40px;
  padding-left: 15px;
  border-radius: 25px;
  border: 1px solid var(--medium-blue);
`;

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Logo = styled(Doublecheck)`
  width: 200px;
  height: 100px;
  padding: 0;
  margin-top: 100px;
`;

const BgImg = styled.div`
  position: absolute;
  top: 0;
  width: inherit;
  height: 161px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
`;

const Icon = styled.img`
  width: 20px;
  margin-right: 8px;
`;

const TestAccountButton = styled.button`
  font-family: 'Pretendard-Regular', sans-serif;
  font-size: var(--font-xs-size);
  margin: 13px 3px 28px;
`;

const SignUpLink = styled(Link)`
  text-decoration: underline;
  color: var(--gray-500);
  display: block;
  margin-top: 15px;
  text-align: center;
`;
