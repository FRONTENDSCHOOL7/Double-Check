import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { profileAPI } from 'API/Profile';
import { useRecoilState } from 'recoil';
import loginToken from 'Recoil/LoginToken';
import userInfoState from 'Recoil/UserInfo';
import ImageCheck from 'components/Common/ImageCheck';
import { navBar } from 'Recoil/Navbar';
import { IoSearchOutline } from 'react-icons/io5';
export default function MainTopBar() {
  const [token] = useRecoilState(loginToken);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isLoading, setIsLoading] = useState(true);
  const [, setShowNavBar] = useRecoilState(navBar);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await profileAPI(token);
        if (response && response.user) {
          const { user } = response;
          const checkedImage = ImageCheck(user.image, 'profile');
          setUserInfo({
            name: user.username,
            id: user._id,
            image: checkedImage,
            accountname: user.accountname,
          });
        }
      } catch (error) {
        console.error('유저 정보 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
        setShowNavBar(true);
      }
    };

    fetchUserInfo();
  }, [setShowNavBar, setUserInfo, token]);

  const userImage = userInfo ? ImageCheck(userInfo.image, 'profile') : null;

  return (
    <>
      <SHeader>
        <SLogoLink>
          {/* /로고넣을자리 */}
          <h1>DOUBLE CHECK</h1>
        </SLogoLink>
        <div>
          <Link to={userInfo ? `/profile/${userInfo.accountname}` : '#'}>
            {isLoading ? (
              '프로필를 불러오는 중...'
            ) : userInfo?.image ? (
              <SUserImage src={userImage} alt={userInfo.name} />
            ) : (
              '유저 정보를 찾을 수 없습니다.'
            )}
          </Link>
          <SSearchLink to={'/search'}>
            <IoSearchOutline />
          </SSearchLink>
        </div>
      </SHeader>
      <SMyAccountSection>
        {userInfo?.name && (
          <div>
            <SUserName>
              <span className='highlight'>{userInfo.name}</span> 님
            </SUserName>
            <p>독서 여정을 통해 자신을 발견하고 성장하세요!</p>
          </div>
        )}
      </SMyAccountSection>
    </>
  );
}
const SLogoLink = styled(Link)`
  h1 {
    font-weight: 800;
    color: var(--dark-purple);
    font-size: var(--font-sm-size);
    line-height: 1.2;
  }
`;
const SSearchLink = styled(Link)`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 30%;

  svg {
    font-size: 1.5rem;
  }
`;
const SHeader = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: white;
  /* box-shadow: 0px 1px 1px var(--gray-300); */
  align-items: center;
  width: 390px;
  height: 85px;
  padding: 0 16px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  z-index: 100;

  div {
    display: flex;
    gap: 7px;
  }
`;

const SMyAccountSection = styled.section`
  display: flex;
  flex-direction: column;
  text-align: start;
  line-height: 1.4;
  margin: 35px 20px 24px 20px;
  p {
    font-size: var(--font-sm-size);
  }
`;

const SUserImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 30%;
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const SUserName = styled.p`
  font-size: var(--font-sm-size);
  .highlight {
    display: inline;
    box-shadow: inset 0 -10px 0 var(--medium-blue);
  }
`;
