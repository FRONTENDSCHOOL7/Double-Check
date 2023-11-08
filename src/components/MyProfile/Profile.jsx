/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ImageCheck from 'components/Common/ImageCheck';
import { accountProfileAPI, profileAPI, followAPI, unfollowAPI } from 'API/Profile';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { showToast } from 'Hooks/useCustomToast';
import { useRecoilState } from 'recoil';
import accountname from 'Recoil/Accountname';

export default function Profile({ onShowFollowers, onShowFollowings, activeButton }) {
  const [profileData, setProfileData] = useState({
    user: {
      username: '',
      accountname: '',
      intro: '',
      image: '',
    },
  });
  const [myAccountname, setMyAccountname] = useRecoilState(accountname);
  console.log(myAccountname);

  const [profile, setProfile] = useState({
    username: '',
    imageUrl: '',
    accountname: '',
    followerCount: 0,
    followingCount: 0,
    intro: '프로필을 설정해 자신을 소개해주세요!',
    categories: [],
  });
  const [isFollowing, setIsFollowing] = useState(false);

  const [myProfile, setMyProfile] = useState(false);
  const location = useLocation();
  const { accountname: urlaccountname } = useParams();
  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        let response;
        let isMyProfile = location.pathname.includes('/profile/myinfo');

        if (isMyProfile) {
          response = await profileAPI();
        } else {
          response = await accountProfileAPI(urlaccountname);
        }

        if (response) {
          console.log(response);
          const profileData = isMyProfile ? response.user : response.profile;
          setMyAccountname(profileData.accountname);

          const checkedImage = await ImageCheck(profileData.image, 'profile');

          let introText = profile.intro;
          let categoryArray = profile.categories;

          if (profileData.intro && profileData.intro.includes('@cc@')) {
            const [intro, categories] = profileData.intro.split('@cc@');
            introText = intro.trim();
            categoryArray = categories
              ? categories.split(',').map((category) => category.trim())
              : [];
          }

          setProfile((prevProfile) => ({
            ...prevProfile,
            ...profileData,
            imageUrl: checkedImage,
            intro: introText || prevProfile.intro,
            categories: categoryArray,
          }));

          setMyProfile(isMyProfile);
        } else {
          showToast('프로필 정보가 없습니다.');
        }
      } catch (err) {
        console.error(err);
        showToast('프로필 요청에 실패했습니다.');
      }
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchProfileData();
    }
  }, [accountname, location.pathname]);

  async function toggleFollow(accountnameToToggle) {
    if (!accountnameToToggle) return;

    const API = isFollowing ? unfollowAPI : followAPI;
    const action = isFollowing ? '언팔로우' : '팔로우';

    try {
      const response = await API({ accountname: accountnameToToggle });
      if (response) {
        console.log(response);
        console.log(response.profile.isfollow);
        showToast(`${action}를 성공했습니다.`);
        setIsFollowing(!isFollowing);
      }
    } catch (err) {
      console.error(`${action} 요청 실패`, err);
      showToast(`${action} 요청에 실패했습니다.`);
    }
  }

  const navigateToSetMyInfo = () => {
    navigate('/setmyinfo');
  };

  return (
    <>
      <ProfileContainer>
        <ProfileFollow
          onClick={onShowFollowers}
          className={activeButton === 'followers' ? 'active' : ''}
        >
          <p>{profile.followerCount}</p>
          <p>팔로워</p>
        </ProfileFollow>
        <ProfileDetails>
          <ProfileImage src={profile.imageUrl} alt='Profile' />
          <ProfileName>{profile.username} 님</ProfileName>
        </ProfileDetails>
        <ProfileFollow
          onClick={onShowFollowings}
          className={activeButton === 'followings' ? 'active' : ''}
        >
          <p>{profile.followingCount}</p>
          <p>팔로잉</p>
        </ProfileFollow>
      </ProfileContainer>
      <ProfileSetSection>
        <IntroWrapper>
          <Intro>소개</Intro>
        </IntroWrapper>
        <CateIntroWrapper>
          <CategoryUl>
            {profile.categories.map((category, index) => (
              <CategoryLi key={index}>{category}</CategoryLi>
            ))}
          </CategoryUl>
          <IntroExplain>{profile.intro}</IntroExplain>
        </CateIntroWrapper>
        <ProfileSetBtn onClick={navigateToSetMyInfo}>프로필 설정하기</ProfileSetBtn>
      </ProfileSetSection>
    </>
  );
}

const ProfileContainer = styled.div`
  margin: 29px auto 25px;
  display: flex;
  justify-content: space-between;
`;

const ProfileFollow = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 5px;
  justify-content: center;
  font-size: var(--font-sm-size);
  font-family: 'Pretendard-Medium', sans-serif;
  &.active {
    color: var(--dark-purple);
    &::before {
      content: '';
      width: 38px;
      height: 4px;
      border-radius: 23px;
      background-color: var(--dark-purple);
    }
  }
`;

const ProfileDetails = styled.div`
  text-align: center;
  flex: 1;
`;
const ProfileImage = styled.img`
  width: 108px;
  height: 108px;
  border-radius: 50%;
  object-fit: cover; // 이미지 비율을 유지하면서 요소에 맞추기
`;

const ProfileName = styled.div`
  font-family: 'Pretendard-SemiBold', sans-serif;
  margin-top: 5px;
  text-align: center;
`;

const ProfileSetSection = styled.section`
  width: 345px;
  margin: 0 auto;
  display: block;
  padding: 19px 0 25px 20px;
  background-color: var(--light-blue);
  border: none;
  border-radius: 20px;
  text-align: left;
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 18px;
`;

// const TopBox = styled.div`
//   width: 20px;
//   height: 8px;
//   border-radius: 30px;
//   background: #d2d8fa;
// `;

const IntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-top: 5px;
`;

const Intro = styled.p`
  font-family: 'Pretendard-SemiBold', sans-serif;
  font-size: var(--font-base-size);
`;

const CateIntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 10px;
  width: 245px; // intro 내용이 너무 길 때 숨김처리를 위한 너비값
`;

const CategoryUl = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 7px;
`;

const CategoryLi = styled.li`
  background-color: var(--white);
  padding: 5px 10px;
  border-radius: 10px;
  font-size: var(--font-xs-size);
  font-family: 'Pretendard-Regular', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--gray-300);
`;

const IntroExplain = styled.p`
  padding-bottom: 10px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 38px;
  line-height: 1.3;
  font-family: 'Pretendard-Regular', sans-serif;
`;

const ProfileSetBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: 5px;
  padding: 3px 21px;
  font-family: 'Pretendard-regular', sans-serif;
`;
