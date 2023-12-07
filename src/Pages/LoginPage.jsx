/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-prototype-builtins */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import { loginAPI } from 'API/User';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginCheck } from 'Recoil/LoginCheck';
import loginToken from 'Recoil/LoginToken';
import { navBar } from 'Recoil/Navbar';
import { styled } from 'styled-components';
import { ReactComponent as Doublechaek } from '../assets/images/logo/logo6.svg';
import Bg from '../assets/images/bg/bg-white-space.svg';
import Button from 'components/Common/Button/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showNavBar, setShowNavBar] = useRecoilState(navBar);
  const [userErrorMessage, setUserErrorMessage] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [isLoginCheck, setIsLoginCheck] = useRecoilState(loginCheck);
  const [token, setToken] = useRecoilState(loginToken);
  const [valid, setValid] = useState(false);

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
      setToken(newToken);
      location.reload(navigate('/main'));
    } else if (response.status === 422) {
      setErrorMessage('이메일또는 비밀번호가 일치하지 않습니다.');
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
          {valid ? (
            <Button category='basic' shape='big' type='submit' onClick={handleLogin}>
              로그인
            </Button>
          ) : (
            <DisabledButton type='button' disabled={true}>
              로그인
            </DisabledButton>
          )}
        </form>
      </LoginBox>
    </>
  );
}

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0;
`;

const LoginBox = styled.div`
  padding: 0 49px;
`;

const Label = styled.label`
  margin-bottom: 9px;
  color: #471bb2;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 100% */
`;

const ErrorMassage = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 14px;
`;

const DisabledButton = styled.button`
  height: 49px;
  width: 100%;
  font-size: 16px;
  color: #fff;
  border-radius: 17px;
  background: #b29aff;
  margin-top: 33px;
  opacity: 0.6;
`;

const InputBox = styled.input`
  height: 40px;
  padding-left: 15px;
  border-radius: 25px;
  border: 1px solid #d2d8fa;
`;

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Logo = styled(Doublechaek)`
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
  background-image: url(${Bg});
  overflow: hidden;
  background-size: cover;
  background-position: center;
`;
