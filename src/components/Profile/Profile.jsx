/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ImageCheck from 'components/Common/ImageCheck';
import { accountProfileAPI, profileAPI, followAPI, unfollowAPI } from 'API/Profile';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { showToast } from 'Hooks/useCustomToast';
import { useRecoilState, useRecoilValue } from 'recoil';
import accountname from 'Recoil/Accountname';

export default function Profile({
  onShowPosts,
  onShowPhrase,
  onShowFollowers,
  onShowFollowings,
  activeButton,
  validUserPosts,
  myPhrase,
}) {
  const [myAccountname, setMyAccountname] = useRecoilState(accountname);
  const [myProfile, setMyProfile] = useState(false);
  const location = useLocation();
  const { accountname: urlaccountname } = useParams();
  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    username: '',
    imageUrl: '',
    accountname: '',
    followerCount: 0,
    followingCount: 0,
    intro: '프로필을 설정해 자신을 소개해주세요!',
    categories: [],
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        let response;
        let isMyProfile = urlaccountname === myAccountname;

        if (isMyProfile) {
          setMyProfile(true);
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

  const navigateToSetMyInfo = () => {
    navigate('/setmyinfo');
  };

  const ProfileSet = myProfile && (
    <ProfileSetBtn onClick={navigateToSetMyInfo}>프로필 설정하기</ProfileSetBtn>
  );

  return (
    <>
      <ProfileDetails>
        <ProfileImage src={profile.imageUrl} alt='Profile' />
        <AccountTxt>
          <span>{profile.username} 님</span>
          <span className='accountname'>{profile.accountname}</span>
        </AccountTxt>
      </ProfileDetails>
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
        {ProfileSet}
        {/* <ProfileSetBtn onClick={navigateToSetMyInfo}>프로필 설정하기</ProfileSetBtn> */}
      </ProfileSetSection>
      <ProfileContainer>
        <ProfileTab
          onClick={onShowPosts}
          className={
            activeButton === 'posts' ||
            (activeButton !== 'followers' &&
              activeButton !== 'followings' &&
              activeButton !== 'phrase')
              ? 'active'
              : ''
          }
        >
          <p>{validUserPosts.length}</p>
          <p>피드</p>
        </ProfileTab>
        <ProfileTab onClick={onShowPhrase} className={activeButton === 'phrase' ? 'active' : ''}>
          <p>{myPhrase.length}</p>
          <p>글귀</p>
        </ProfileTab>
        <ProfileTab
          onClick={onShowFollowers}
          className={activeButton === 'followers' ? 'active' : ''}
        >
          <p>{profile.followerCount}</p>
          <p>팔로워</p>
        </ProfileTab>
        <ProfileTab
          onClick={onShowFollowings}
          className={activeButton === 'followings' ? 'active' : ''}
        >
          <p>{profile.followingCount}</p>
          <p>팔로잉</p>
        </ProfileTab>
      </ProfileContainer>
    </>
  );
}

const ProfileContainer = styled.div`
  margin: 15px auto 17px;
  display: flex;
  justify-content: center;
  gap: 21px;
`;

const ProfileTab = styled.button`
  width: 66px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  justify-content: center;
  border: 1px solid var(--gray-300);
  border-radius: 10px;
  color: var(--gray-500);
  font-size: var(--font-xs-size);
  font-family: 'Pretendard-Regular', sans-serif;
  &.active {
    background-color: var(--gray-200);
    color: var(--black);
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  margin: 17px 31px;
  align-items: center;
  gap: 13px;
`;

const ProfileImage = styled.img`
  width: 59px;
  height: 59px;
  border-radius: 50%;
  object-fit: fill;
  aspect-ratio: 1/1;
`;

const ProfileName = styled.div`
  font-family: 'Pretendard-Medium', sans-serif;
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

const AccountTxt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  & > span:first-of-type {
    font-family: 'Pretendard-SemiBold';
  }
  .accountname {
    font-size: var(--font-xs-size);
    color: var(--gray-500);
  }
`;
