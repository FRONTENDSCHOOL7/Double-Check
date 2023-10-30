/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { profileAPI, setProfile, setProfileAPI } from 'API/Profile';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginCheck } from 'Recoil/LoginCheck';
import loginToken from 'Recoil/LoginToken';
import { styled } from 'styled-components';
import imageCompression from 'browser-image-compression';
import { ImageUpload } from 'API/ImageUpload';

export default function SetMyInfo() {
  const [myInfo, setMyInfo] = useState({});
  const [isLogin, setIsLogin] = useRecoilState(loginCheck);
  const [token, setToken] = useRecoilState(loginToken);
  const [profileImage, setProfileImage] = useState('');
  const [profileData, setProfileData] = useState({
    user: {
      username: '',
      accountname: '',
      intro: '',
      image: '',
    },
  });
  // console.log(token);
  // console.log(isLogin);

  // 입력값 변경 처리 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
  };

  // 프로필 정보 확인 함수
  const DataInfo = () => {
    console.log(profileData);
  };

  // 내 프로필 정보 불러오기 함수
  const getMyProfile = async () => {
    const response = await profileAPI(token);
    setMyInfo(response.user);
  };

  // 이미지 변경 처리 함수
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const response = await ImageUpload(file);
    console.log(response);
    setProfileImage(response.data.filename);
  };

  useEffect(() => {
    if (myInfo) {
      console.log(myInfo);
    }
  }, [myInfo]);

  useEffect(() => {
    setProfileData((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        image: profileImage,
      },
    }));
  }, [profileImage]);

  // 로그아웃 함수
  const logOut = () => {
    setIsLogin(false);
    setToken(null);
  };

  // 프로필 수정 요청
  const profileUpload = async () => {
    const response = await setProfileAPI(profileData, token);
    console.log(profileData);
    console.log(response);
  };

  return (
    <>
      {/* <ButtonDiv>
        <Button type='button' onClick={getMyProfile}>
          내 정보 불러오기
        </Button>
      </ButtonDiv> */}
      <ButtonDiv>
        <Button type='button' onClick={logOut}>
          로그아웃
        </Button>
      </ButtonDiv>
      {/* <ButtonDiv>
        <Button type='button' onClick={DataInfo}>
          데이터 확인
        </Button>
      </ButtonDiv> */}
      <ButtonDiv>
        <Button type='button' onClick={profileUpload}>
          프로필수정
        </Button>
      </ButtonDiv>
      <input
        type='text'
        placeholder='계정ID'
        id='accountname'
        name='accountname'
        value={profileData.user.accountname}
        onChange={handleInputChange}
      />
      <input
        type='file'
        placeholder='이미지 업로드'
        id='image'
        onChange={handleImageChange} // 이미지 변경 처리
      />
      <input
        type='text'
        placeholder='소개'
        id='intro'
        name='intro'
        value={profileData.user.intro}
        onChange={handleInputChange}
      />
      <input
        type='text'
        placeholder='사용자 이름'
        id='username'
        name='username'
        value={profileData.user.username}
        onChange={handleInputChange}
      />
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
