/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
// import React, { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { emailState, passwordState } from "../atoms/user";

function LoginPage({ handlePage }) {
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);

  const login = async (email, password) => {
    const baseUrl = "https://api.mandarin.weniv.co.kr";
    const reqPath = "/user/login";
    const reqUrl = baseUrl + reqPath;

    const loginData = {
      user: {
        email: email,
        password: password,
      },
    };

    try {
      // fetch에서 POST, 명시 안하면 기본값이 GET
      // 로그인해서 token 꺼내기
      const res = await axios(reqUrl, {
        method: "POST", // 대문자로!
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginData), // 문자열로 만들어줘야함
      });
      const json = await res.json();
      console.log(json);
      // 객체에 user가 없는 경우 == 로그인 실패 했을 때
      // if(!json.user) {
      //     return
      // }
      const token = json.user.token;
      console.log(token);
      // 로컬스토리지에 토큰 저장하기
      localStorage.setItem("token", token);
    } catch (error) {
      alert("로그인에 실패했습니다.");
    }
  };

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <h1>로그인</h1>
      <section>
        <h2>이메일, 비밀번호 입력하는 곳</h2>
        <form onSubmit={submitLogin}>
          <input
            type="text"
            placeholder="이메일 입력"
            onChange={inputEmail}
            value={email}
          />
          <input
            type="text"
            placeholder="비밀번호 입력"
            onChange={inputPassword}
            value={password}
          />
          <button type="button" onClick={handlePage}>
            회원가입
          </button>
        </form>
      </section>
    </>
  );
}

export default LoginPage;
