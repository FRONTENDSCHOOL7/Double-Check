/* eslint-disable no-unused-vars */
import Button from 'Components/Common/Button/Button';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginCheck } from 'Recoil/LoginCheck';
import loginToken from 'Recoil/LoginToken';

export default function MainPage() {
  const [isLogin, setIsLogin] = useRecoilState(loginCheck);
  const [token, setToken] = useRecoilState(loginToken);
  console.log(isLogin);
  console.log(token);

  const logOut = () => {
    setIsLogin(false);
    setToken(null);
  };

  return (
    <>
      <h2>MainPage</h2>
      <button onClick={logOut}>로그아웃</button>
    </>
  );
}
