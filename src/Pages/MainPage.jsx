import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { profileAPI } from 'API/Profile';
import { useRecoilState } from 'recoil';
import loginToken from 'Recoil/LoginToken';
import userInfoState from 'Recoil/UserInfo';
import ImageCheck from 'components/Common/ImageCheck';

export default function MainPage() {
  const [token] = useRecoilState(loginToken);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const fetchUserInfo = async () => {
      try {
        const response = await profileAPI(token);
        if (response && response.user) {
          const checkedImage = ImageCheck(response.user.image, 'profile');
          setUserInfo({
            name: response.user.username,
            id: response.user._id,
            image: checkedImage,
            accountname: response.user.accountname,
          });
        }
      } catch (error) {
        console.error('유저 정보 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [token, setUserInfo]);

  const userImage = userInfo ? ImageCheck(userInfo.image, 'profile') : null;

  return (
    <>
      <SMyAccount to={userInfo ? `/profile/${userInfo.accountname}` : '#'}>
        {isLoading ? (
          '프로필를 불러오는 중...'
        ) : userInfo ? (
          <>
            <SUserImage src={userImage} alt={userInfo.name} />
            <SUserName>{userInfo.name}님</SUserName>
          </>
        ) : (
          '유저 정보를 찾을 수 없습니다.'
        )}
      </SMyAccount>
    </>
  );
}

const SMyAccount = styled(Link)`
  display: flex;
  align-items: center;
  `;

const SUserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  `;

const SUserName = styled.h2`
  font-size: var(--font-xs-size);
`;
