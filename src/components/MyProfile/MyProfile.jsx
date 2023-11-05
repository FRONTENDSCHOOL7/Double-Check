import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ImageCheck from 'components/Common/ImageCheck';
import { profileAPI } from 'API/Profile';
// import showMore from '../../assets/images/icon/show-more-y.svg';

export default function MyProfile() {
  const [profile, setProfile] = useState({
    username: '',
    imageUrl: '',
    accountname: '',
    followerCount: 0,
    followingCount: 0,
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
        if (data && data.user) {
          // ImageCheck 컴포넌트를 사용하여 프로필 이미지를 검증하고, 필요한 경우 기본 이미지로 대체합니다.
          const checkedImage = ImageCheck(data.user.image, 'profile');

          setProfile({
            username: data.user.username,
            accountname: data.user.accountname,
            followerCount: data.user.followerCount,
            followingCount: data.user.followingCount,
            imageUrl: checkedImage,
          });
          console.log(data);
        }
      } catch (error) {
        console.error('API 요청 중 에러 발생:', error);
      }
    };

    fetchProfileData();
  }, []);

  // profile이 있으면 이미지를 ImageCheck를 통해 검사하고, 그 결과를 사용합니다.
  const userImage = profile ? ImageCheck(profile.imageUrl, 'profile') : null;

  const [, setProfileData] = useState();
  const [intro, setIntro] = useState('프로필을 설정해 자신을 소개해주세요!');
  const [categories, setCategories] = useState([]);

  const isFirstRender = useRef(true);

  // 프로필 정보 요청
  const getMyProfile = async () => {
    try {
      const token = localStorage.getItem('token'); // token을 localStorage에서 가져옵니다.
      const response = await profileAPI(token); // profileAPI 함수가 정의되어 있어야 합니다.
      console.log(response);
      setProfileData(response); // setProfileData 함수가 정의되어 있어야 합니다.

      // intro가 있는지 확인하고, 있으면 처리합니다.
      if (response.user.intro) {
        const parts = response.user.intro.split('@cc@');
        setIntro(parts[0]); // 첫 번째 부분은 intro로 설정

        // 두 번째 부분(카테고리)이 있는지 확인하고, 있으면 설정합니다.
        if (parts.length > 1) {
          const categoryParts = parts[1].split(',');
          setCategories(categoryParts);
        }
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
    isFirstRender.current = false;
  };

  // 첫 렌더링 시 getMyProfile 함수 호출
  useEffect(() => {
    if (isFirstRender.current) {
      getMyProfile();
    }
  }, []);
  console.log(categories);
  return (
    <div>
      <ProfileContainer>
        <ProfileFollow>
          <p>{profile.followerCount}</p>
          <p>팔로워</p>
        </ProfileFollow>
        <ProfileDetails>
          <ProfileImage src={userImage} alt='Profile' />
          <ProfileName>{profile.username} 님</ProfileName>
        </ProfileDetails>
        <ProfileFollow>
          <p>{profile.followingCount}</p>
          <p>팔로잉</p>
        </ProfileFollow>
      </ProfileContainer>
      <ProfileSetButton>
        <IntroWrapper>
          <TopBox />
          <Intro>소개</Intro>
        </IntroWrapper>
        <CateIntroWrapper>
          <CategoryUl>
            {categories.map((category, index) => (
              <CategoryLi key={index}>{category}</CategoryLi>
            ))}
          </CategoryUl>
          <IntroExplain>{intro}</IntroExplain>
        </CateIntroWrapper>
      </ProfileSetButton>
      <ProfileReview>
        <p>여기에 피드 받아오기</p>
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
  gap: 5px;
  margin-top: 70px;
  font-size: var(--font-xs-size);
`;

const ProfileDetails = styled.div`
  margin-top: 45px;
`;
const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover; // 이미지 비율을 유지하면서 요소에 맞추기
`;

const ProfileName = styled.div`
  font-weight: bold;
  margin-top: 5px;
  text-align: center;
`;

const ProfileSetButton = styled.button`
  width: 345px;
  margin: 40px auto 0;
  display: block;
  padding: 25px 0 25px 20px;
  background-color: var(--light-blue);
  border: none;
  border-radius: 20px;
  text-align: left;
  display: flex;
  flex-direction: row;
  gap: 28px;
`;

const ProfileReview = styled.div`
  margin-top: 20px;
`;

const TopBox = styled.div`
  width: 20px;
  height: 8px;
  border-radius: 30px;
  background: #d2d8fa;
`;

const IntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Intro = styled.p`
  font-family: 'Pretendard-SemiBold', sans-serif;
  font-size: var(--font-base-size);
`;

const CateIntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CategoryUl = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 7px;
`;

const CategoryLi = styled.li`
  background-color: var(--white);
  padding: 2px 10px;
  border-radius: 10px;
`;

const IntroExplain = styled.p`
  padding-bottom: 10px;
`;
