/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
// import { useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import {
  accountnameState,
  emailState,
  introState,
  passwordState,
  usernameState,
} from "../atoms/user";

const SignUpPage = ({ handlePage }) => {
  const [username, setUsername] = useRecoilState(usernameState);
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [accountname, setAccountname] = useRecoilState(accountnameState);
  const [intro, setIntro] = useRecoilState(introState);

  const signUp = async (signUpData) => {
    console.log(signUpData);

    const reqUrl = "https://api.mandarin.weniv.co.kr/user";
    try {
      const res = await axios.post(
        reqUrl,
        { user: signUpData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  };

  const inputUserName = (e) => {
    setUsername(e.target.value);
  };

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  const inputAccountname = (e) => {
    setAccountname(e.target.value);
  };

  const inputIntro = (e) => {
    setIntro(e.target.value);
  };

  const submitSignUp = () => {
    const signUpData = {
      username: username,
      email: email,
      password: password,
      accountname: accountname,
      intro: intro,
    };
    signUp(signUpData);
  };

  return (
    <>
      <button type="button" onClick={handlePage}>
        로그인페이지로 돌아가기
      </button>
      <section>
        <h2>이메일로 회원가입</h2>
        <div>
          <label htmlFor="emailInput">이메일</label>
          <input
            type="email"
            id="emailInput"
            name="email"
            placeholder="이메일 주소를 알려주세요."
            onChange={inputEmail}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="passwordInput">비밀번호</label>
          <input
            type="password"
            name="password"
            id="passwordInput"
            placeholder="비밀번호를 설정해 주세요."
            onChange={inputPassword}
            value={password}
          />
        </div>
        <button type="button">다음</button>
      </section>

      <section>
        <div>
          <label htmlFor="userNameInput">사용자 이름</label>
          <input
            type="text"
            id="userNameInput"
            name="username"
            placeholder="2~10자 이내여야 합니다."
            onChange={inputUserName}
            value={username}
          />
        </div>
        <div>
          <label htmlFor="userIdInput">계정 ID</label>
          <input
            type="text"
            id="userIdInput"
            name="accountname"
            placeholder="영문, 숫자, 특수문자(,), (_)만 사용 가능합니다."
            onChange={inputAccountname}
            value={accountname}
          />
        </div>
        <div>
          <label htmlFor="userIntroInput">소개</label>
          <input
            type="text"
            id="userIntroInput"
            name="intro"
            placeholder="자신과 판매할 상품에 대해 소개해 주세요."
            onChange={inputIntro}
          />
        </div>
        <button type="button" onClick={submitSignUp}>
          감귤마켓 시작하기
        </button>
      </section>
    </>
  );
};

export default SignUpPage;
