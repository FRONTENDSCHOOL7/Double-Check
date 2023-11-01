import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function MyProfile() {
  const [profile, setProfile] = useState({
    username: '',
    followerCount: 0,
    followingCount: 0,
    imageUrl: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      // 로컬스토리지에 토큰이 있는지 확인
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다. 로그인을 해주세요.');
        return;
      }
      try {
        // 로컬스토리지에 토큰이 있으면 api 요청 시작
        const response = await fetch('https://api.mandarin.weniv.co.kr/user/myinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);

        setProfile({
          username: data.user.username,
          followerCount: data.user.followerCount,
          followingCount: data.user.followingCount,
          imageUrl: data.userimageUrl,
        });
        console.log(data);
      } catch (error) {
        console.error('API 요청 중 에러 발생:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      <ProfileContainer>
        <ProfileFollow>
          <p>{profile.followerCount}</p>
          <p>팔로워</p>
        </ProfileFollow>
        <ProfileDetails>
          <ProfileImage src={profile.imageUrl} alt='Profile' />
          <ProfileName>{profile.username} 님</ProfileName>
        </ProfileDetails>
        <ProfileFollow>
          <p>{profile.followingCount}</p>
          <p>팔로잉</p>
        </ProfileFollow>
      </ProfileContainer>
      <ProfileSetButton>
        프로필을 설정해 <br />
        자신을 소개해주세요!
      </ProfileSetButton>
      <ProfileReview>
        <h3>Snow White</h3>
        <p>백설공주와 일곱 난쟁이 (1)</p>
        <ReviewDate>2023-10-13</ReviewDate>
      </ProfileReview>
    </div>
  );
}

const ProfileContainer = styled.div`
  margin: 0 50px;
  display: flex;
  justify-content: space-between;
`;

const ProfileFollow = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const ProfileDetails = styled.div`
  margin-top: 125px;
`;
const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const ProfileName = styled.div`
  font-weight: bold;
`;

const ProfileSetButton = styled.button`
  width: 345px;
  height: 108px;
  margin: 51px auto 0;
  display: block;
  padding: 10px;
  background-color: #f2f4ff;
  border: none;
  border-radius: 5px;
`;

const ProfileReview = styled.div`
  margin-top: 20px;
`;

const ReviewDate = styled.div`
  color: #888;
`;
