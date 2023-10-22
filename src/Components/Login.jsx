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
      const res = await axios.post(reqUrl, {
        loginData,
        headers: {
          "Content-type": "application/json",
        },
      });
      const json = await res.json();
      console.log(json);
      const token = json.user.token;
      console.log(token);
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

  const logOut = () => {
    localStorage.setItem("token", "");
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
            로그인하기
          </button>
          <button type="button" onClick={logOut}>
            로그아웃하기
          </button>
        </form>
      </section>
    </>
  );
}

export default LoginPage;
