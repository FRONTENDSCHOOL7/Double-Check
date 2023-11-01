/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { accountnameValid, emailValid, signUpAPI } from 'API/User';
import { useRecoilState } from 'recoil';
import { navBar } from 'Recoil/Navbar';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState([]);
  const [showNavBar, setShowNavBar] = useRecoilState(navBar);
  const [userErrorMessage, setUserErrorMessage] = useState([]); // "errorMessage"를 제거하고 "userErrorMessage"로 변경
  const [checkPassword, setCheckPassword] = useState('');
  // const [emailDuplicate, setEmailDuplicate] = useState(true);
  // const [accountnameDuplicate, setAccountnameDuplicate] = useState(true);
  const [signUpCheck, setSignUpCheck] = useState(false);
  const [signUpData, setSignUpData] = useState({
    user: {
      username: '',
      email: '',
      password: '',
      accountname: '',
    },
  });

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
  };

  const emailAvailable = async () => {
    const errors = [];
    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/g;
    const email = signUpData.user.email;
    const data = {
      user: {
        email: email,
      },
    };

    if (email === '') {
      errors.push('이메일을 입력해주세요.');
      setSignUpCheck(false);
    } else if (!emailRegex.test(email)) {
      errors.push('이메일 형식이 올바르지 않습니다.');
      setSignUpCheck(false);
    } else {
      try {
        const response = await emailValid(data);
        if (response.message === '이미 가입된 이메일 주소 입니다.') {
          errors.push('이미 가입된 이메일 입니다.');
          // setEmailDuplicate(true);
          setSignUpCheck(false);
        } else {
          setSignUpCheck(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    setUserErrorMessage(errors);
  };

  const accountnameAvailable = async () => {
    const errors = [];
    // eslint-disable-next-line no-useless-escape
    const accountnameRegex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    const accountname = signUpData.user.accountname;
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
          // setAccountnameDuplicate(true);
          setSignUpCheck(false);
        } else {
          setSignUpCheck(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    setUserErrorMessage(errors);
  };

  const handleError = () => {
    const errors = [];
    const username = signUpData.user.username;
    const passwordLength = signUpData.user.password.length;
    if (passwordLength < 6) {
      errors.push('비밀번호를 6자리 이상 입력해주세요');
      setSignUpCheck(false);
    } else if (signUpData.user.password !== checkPassword) {
      errors.push('비밀번호가 일치하지 않습니다.');
      setSignUpCheck(false);
    } else if (username === '') {
      errors.push('사용자 이름을 입력해 주세요');
      setSignUpCheck(false);
    } else if (accountnameDuplicate) {
      errors.push('이미 가입된 계정ID 입니다.');
    } else {
      errors.push('');
      setSignUpCheck(true);
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

  return (
    <>
      <section>
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
            onBlur={emailAvailable}
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
            onBlur={handleError}
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
            onChange={(e) => setCheckPassword(e.target.value)}
            onBlur={handleError}
          />
          {userErrorMessage.includes('비밀번호가 일치하지 않습니다.') && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
        </InputDiv>
      </section>

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
            onBlur={handleError}
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
            onBlur={accountnameAvailable}
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
          {!signUpCheck ? (
            <DisabledButton type='button' disabled={true}>
              가입하기
            </DisabledButton>
          ) : (
            <Button type='button' onClick={handleSubmitBtn}>
              가입하기
            </Button>
          )}
        </ButtonDiv>
      </section>
    </>
  );
}

const TopBox = styled.div`
  width: 48px;
  height: 11px;
  margin-left: 38px;
  margin-bottom: 12px;
  border-radius: 30px;
  background: #d2d8fa;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 32px 26px 32px;
`;

const H1 = styled.h1`
  margin-left: 38px;
  margin-bottom: 63px;
  color: #000;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 100;
  line-height: 14px;
  margin: 0 0 6px 0;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
`;

const ErrorMassage = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 14px;
`;

const Button = styled.button`
  width: 298px;
  height: 49px;
  border-radius: 17px;
  background: #b29aff;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
`;
const DisabledButton = styled.button`
  width: 298px;
  height: 49px;
  border-radius: 17px;
  background: #b29aff;
  color: #fff;
  opacity: 0.6;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
`;

const InputBox = styled.input`
  height: 52px;
  border-radius: 4px;
  background: #f8f8f8;
`;
