/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
import { profileAPI } from 'API/Profile';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginCheck } from 'Recoil/LoginCheck';
import loginToken from 'Recoil/LoginToken';
import { styled } from 'styled-components';

export default function SetMyInfo() {
  const [myInfo, setMyInfo] = useState({});
  const [isLogin, setIsLogin] = useRecoilState(loginCheck);
  const [token, setToken] = useRecoilState(loginToken);
  console.log(token);
  console.log(isLogin);

  const getMyProfile = async () => {
    const response = await profileAPI(token);
    setMyInfo(response.user);
  };

  useEffect(() => {
    if (myInfo) {
      console.log(myInfo);
    }
  }, [myInfo]);

  const logOut = () => {
    setIsLogin(false);
    setToken(null);
  };

  return (
    <>
      <ButtonDiv>
        <Button type='button' onClick={getMyProfile}>
          내 정보 불러오기
        </Button>
      </ButtonDiv>
      <ButtonDiv>
        <Button type='button' onClick={logOut}>
          로그아웃
        </Button>
      </ButtonDiv>
    </>
  );
}

const ButtonDiv = styled.div`
  margin-top: 166px;
`;

const Button = styled.button`
  width: 200px;
  border: 1px solid black;
`;
