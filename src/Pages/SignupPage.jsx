/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { accountnameValid, emailValid, signUpAPI } from 'API/User';
import { useRecoilState } from 'recoil';
import { navBar } from 'Recoil/Navbar';
import Button from 'components/Common/Button/Button';
import Topbar from 'components/Common/Topbar/Topbar';

export default function SignUpPage() {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isAccountNameValid, setIsAccountNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [isUsernameConfirmed, setIsUsernameConfirmed] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState([]);
  const [showNavBar, setShowNavBar] = useRecoilState(navBar);
  const [userErrorMessage, setUserErrorMessage] = useState([]);
  const [checkPassword, setCheckPassword] = useState('');
  const [signUpCheck, setSignUpCheck] = useState(false);
  const [signUpData, setSignUpData] = useState({
    user: {
      username: '',
      email: '',
      password: '',
      accountname: '',
    },
  });
  useEffect(() => {
    if (
      isEmailValid &&
      isAccountNameValid &&
      isPasswordValid &&
      isPasswordConfirmed &&
      isUsernameConfirmed
    ) {
      setSignUpCheck(true);
    } else {
      setSignUpCheck(false);
    }
  }, [isEmailValid, isAccountNameValid, isPasswordValid, isPasswordConfirmed, isUsernameConfirmed]);

  setShowNavBar(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
    // 이메일이 변경되었을 때 emailAvailable 함수 호출
    if (name === 'email') {
      emailAvailable(value);
    }

    // 계정명이 변경되었을 때 accountnameAvailable 함수 호출
    if (name === 'accountname') {
      accountnameAvailable(value);
    }

    if (name === 'username') {
      handleUsernameError(value);
    }

    if (name === 'password') {
      handlePasswordError(value);
    }
  };

  const emailAvailable = async (value) => {
    const errors = [];
    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/g;
    const email = value;
    const data = {
      user: {
        email: email,
      },
    };

    if (email === '') {
      errors.push('이메일을 입력해주세요.');
    } else if (!emailRegex.test(email)) {
      errors.push('이메일 형식이 올바르지 않습니다.');
    } else {
      try {
        const response = await emailValid(data);
        if (response.message === '이미 가입된 이메일 주소 입니다.') {
          errors.push('이미 가입된 이메일 입니다.');
          setIsEmailValid(false);
        } else {
          setIsEmailValid(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setUserErrorMessage(errors);
  };

  const accountnameAvailable = async (value) => {
    const errors = [];
    const accountnameRegex = /^[a-zA-Z0-9가-힣]*$/g;
    const accountname = value;
    const data = {
      user: {
        accountname: accountname,
      },
    };

    if (accountname === '') {
      errors.push('계정ID를 입력해 주세요.');
      setSignUpCheck(false);
    } else if (!accountnameRegex.test(accountname)) {
      errors.push('특수문자를 사용할 수 없습니다.');
      setSignUpCheck(false);
    } else {
      try {
        const response = await accountnameValid(data);
        if (response.message === '이미 가입된 계정ID 입니다.') {
          errors.push('이미 가입된 계정ID 입니다.');
          setIsAccountNameValid(false);
        } else {
          setIsAccountNameValid(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setUserErrorMessage(errors);
  };

  const handleUsernameError = (username) => {
    const errors = [];
    if (username === '') {
      errors.push('사용자 이름을 입력해 주세요');
      setIsUsernameConfirmed(false);
    } else {
      setIsUsernameConfirmed(true);
    }
    setUserErrorMessage(errors);
  };

  const handlePasswordError = (password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push('비밀번호를 6자리 이상 입력해주세요');
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
    setUserErrorMessage(errors);
  };

  const handleSubmitBtn = async () => {
    console.log(signUpData); // api data 확인
    const response = await signUpAPI(signUpData);
    if (response && response.hasOwnProperty('user')) navigate('/loginpage');
    else {
      const errorMessage = response && response.message ? response.message : handleError();
      setErrorMessage(errorMessage);
    }
  };

  // const handleCheckPassword = (e) => {
  //   const errors = [];
  //   const value = e.target.value;
  //   setCheckPassword(value);
  //   if (signUpData.user.password !== checkPassword) {
  //     errors.push('비밀번호가 일치하지 않습니다.');
  //   } else {
  //     setIsPasswordConfirmed(true);
  //   }
  //   setUserErrorMessage(errors);
  // };

  const handleCheckPassword = (e) => {
    const errors = [];
    const value = e.target.value;
    setCheckPassword(value);
    if (signUpData.user.password !== value) {
      errors.push('비밀번호가 일치하지 않습니다.');
      setIsPasswordConfirmed(false); // 비밀번호가 일치하지 않으면 false로 설정
    } else {
      setIsPasswordConfirmed(true);
    }
    setUserErrorMessage(errors);
  };

  return (
    <>
      <Topbar />
      <SignUpSection>
        <TopBox />
        <H1>회원가입</H1>
        <InputDiv>
          <Label htmlFor='emailInput'>이메일</Label>
          <InputBox
            type='email'
            id='emailInput'
            name='email'
            placeholder='이메일 주소를 알려주세요.'
            onChange={handleInputChange}
            value={signUpData.user.email}
          />
          {userErrorMessage.includes('이메일을 입력해주세요.') && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
          {userErrorMessage.includes('이메일 형식이 올바르지 않습니다.') && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
          {userErrorMessage.includes('이미 가입된 이메일 입니다.') && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
        </InputDiv>
        <InputDiv>
          <Label htmlFor='passwordInput'>비밀번호</Label>
          <InputBox
            type='password'
            name='password'
            id='passwordInput'
            placeholder='비밀번호를 설정해 주세요.'
            onChange={handleInputChange}
            value={signUpData.user.password}
          />
          {userErrorMessage.includes('비밀번호를 입력해 주세요.') && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
          {userErrorMessage.includes('비밀번호를 6자리 이상 입력해주세요') && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
        </InputDiv>
        <InputDiv>
          <Label htmlFor='passwordInput'>비밀번호 확인</Label>
          <InputBox
            type='password'
            name='checkPassword'
            id='checkPassword'
            placeholder='동일한 비밀번호를 입력해주세요.'
            value={checkPassword}
            onChange={handleCheckPassword}
          />
          {userErrorMessage.includes('비밀번호가 일치하지 않습니다.') && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
        </InputDiv>
      </SignUpSection>

      <section>
        <InputDiv>
          <Label htmlFor='userNameInput'>사용자 이름</Label>
          <InputBox
            type='text'
            id='userNameInput'
            name='username'
            placeholder='2~10자 이내여야 합니다.'
            onChange={handleInputChange}
            value={signUpData.user.username}
          />
          {userErrorMessage.includes('사용자 이름을 입력해 주세요') && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
        </InputDiv>
        <InputDiv>
          <Label htmlFor='userIdInput'>계정 ID</Label>
          <InputBox
            type='text'
            id='userIdInput'
            name='accountname'
            placeholder='영문, 숫자, 특수문자(,), (_)만 사용 가능합니다.'
            onChange={handleInputChange}
            value={signUpData.user.accountname}
            maxLength='10'
          />
          {userErrorMessage.includes('계정ID를 입력해 주세요.') && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
          {userErrorMessage.includes('특수문자는 사용할 수 없습니다.') && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
          {userErrorMessage.includes('이미 가입된 계정ID 입니다.') ? (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          ) : null}
        </InputDiv>
        <ButtonDiv>
          {signUpCheck ? (
            <Button category='basic' shape='big' type='submit' onClick={handleSubmitBtn}>
              가입하기
            </Button>
          ) : (
            <Button category='basic' shape='big' disabled={true}>
              가입하기
            </Button>
          )}
        </ButtonDiv>
      </section>
    </>
  );
}

const SignUpSection = styled.section`
  margin-top: 46px;
`;

const TopBox = styled.div`
  width: 48px;
  height: 11px;
  margin-left: 38px;
  margin-bottom: 12px;
  border-radius: 30px;
  background: var(--medium-blue);
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 32px 26px 32px;
`;

const H1 = styled.h1`
  margin-left: 38px;
  margin-bottom: 63px;
  color: var(--black);
  font-family: Pretendard-SemiBold;
  font-size: 30px;
  line-height: normal;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 100;
  line-height: 14px;
  margin: 0 0 6px 0;
`;

const ButtonDiv = styled.div`
  padding: 0 32px;
`;

const ErrorMassage = styled.div`
  margin-top: 10px;
  color: var(--dark-orange);
  font-size: 14px;
`;

const InputBox = styled.input`
  height: 52px;
  border-radius: 12px;
  padding-left: 15px;
  background: #f8f8f8;
`;
