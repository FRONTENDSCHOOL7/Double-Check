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
import { ReactComponent as Doublechaek } from '../assets/images/logo/DOUBLECHECK.svg';
import Bg from '../assets/images/bg/bg-white-space.svg';
import Button from 'components/Common/Button/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showNavBar, setShowNavBar] = useRecoilState(navBar);
  const [userErrorMessage, setUserErrorMessage] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [isLoginCheck, setIsLoginCheck] = useRecoilState(loginCheck);
  const [errorCheck, setErrorCheck] = useState(false);
  const [token, setToken] = useRecoilState(loginToken);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleError();
    await handleLogin();
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
      console.log(response);
    }
  };

  const handleError = () => {
    const errors = [];
    if (loginData.user.email === '') {
      errors.push('이메일을 입력해주세요');
    } else if (loginData.user.password === '') {
      errors.push('비밀번호를 입력해주세요');
    } else {
      setErrorCheck(true);
      errors.push('');
      handleLogin();
    }
    setUserErrorMessage(errors);
  };

  return (
    <>
      <BgImg></BgImg>
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
            {userErrorMessage.includes('이메일을 입력해주세요') && (
              <ErrorMassage>{userErrorMessage}</ErrorMassage>
            )}
            {userErrorMessage.includes('이메일 형식이 올바르지 않습니다.') && (
              <ErrorMassage>{userErrorMessage}</ErrorMassage>
            )}
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
            {userErrorMessage.includes('비밀번호를 입력해주세요') && (
              <ErrorMassage>{userErrorMessage}</ErrorMassage>
            )}
          </InputDiv>
          {errorMessage && loginData.user.email && loginData.user.password && (
            <ErrorMassage>{errorMessage}</ErrorMassage>
          )}
          <Button category='basic' shape='big' type='submit' onClick={handleError}>
            로그인
          </Button>
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
  margin-top: 43px;
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

const Logo = styled(Doublechaek)`
  width: 200px;
  margin-top: 200px;
`;

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
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
