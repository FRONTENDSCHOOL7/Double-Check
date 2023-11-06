import ImageCheck from 'components/Common/ImageCheck';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function FollowerList() {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountname, setAccountname] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 토큰을 가져옵니다.
    const token = localStorage.getItem('token');

    if (token) {
      // 토큰을 사용하여 accountname을 가져오는 함수
      const fetchAccountName = async () => {
        try {
          const response = await fetch('https://api.mandarin.weniv.co.kr/user/myinfo', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch account name');
          }

          const data = await response.json();
          setAccountname(data.user.accountname);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchAccountName();
    } else {
      setError('No token found in local storage.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // accountname이 설정되면 팔로워 목록을 가져옵니다.
    if (accountname) {
      const fetchFollowers = async () => {
        // 로컬 스토리지에서 토큰을 가져옵니다.
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(
            `https://api.mandarin.weniv.co.kr/profile/${accountname}/follower/?limit=10skip=10
            `,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (!response.ok) {
            throw new Error('Failed to fetch followers');
          }

          const data = await response.json();
          console.log(data);

          // ImageCheck를 각 팔로워의 이미지에 적용합니다.
          const checkedFollowers = data.map((follower) => ({
            ...follower,
            image: ImageCheck(follower.image, 'profile'), // 각 팔로워의 image 속성에 대해 ImageCheck 함수를 호출합니다.
          }));
          setFollowers(checkedFollowers);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchFollowers();
    }
  }, [accountname]); // accountname이 변경될 때마다 팔로워 목록을 가져오는 effect가 실행됩니다.

  if (loading) return <Loding>불러오는 중..</Loding>;
  if (error) return <div>Error: {error}</div>;

  // 사용자 프로필로 이동하는 함수
  const goToUserProfile = (accountname) => {
    navigate(`/profile/${accountname}`);
  };

  return (
    <div>
      <FollowerTitle>팔로워 목록</FollowerTitle>
      {followers && followers.length > 0 ? (
        <UserProfileWrapper>
          {followers.map((follower, index) => (
            <UserProfile key={index} onClick={() => goToUserProfile(follower.accountname)}>
              <ProfileImage src={follower.image} alt='Profile' />
              {follower.username}
            </UserProfile>
          ))}
        </UserProfileWrapper>
      ) : (
        <EmptyList>현재 팔로워 목록이 비어있습니다.</EmptyList>
      )}
    </div>
  );
}

const FollowerTitle = styled.p`
  text-align: center;
  margin-top: 20px;
  padding: 13px 0;
  font-family: 'Pretendard-SemiBold', sans-serif;
  font-size: var(--font-base-size);
  border-top: ${(props) => (props.customStyle ? 'none' : 'solid 1px #e4e4e4')};
  border-bottom: ${(props) => (props.customStyle ? 'none' : 'solid 1px #e4e4e4')};
`;

const UserProfileWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 40px 20px 0;
  max-height: 330px; /* 최대 높이 설정, 이 값은 조정 가능 */
  overflow-y: auto; /* 세로 방향으로 내용이 넘치면 스크롤바 표시 */
`;

const UserProfile = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 25px;
  font-family: 'Pretendard-SemiBold', sans-serif;
  font-size: var(--font-base-size);
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover; // 이미지 비율을 유지하면서 요소에 맞추기
`;

const EmptyList = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Pretendard', sans-serif;
  font-size: var(--font-xs-size);
  color: var(--gray-400);
  margin-top: 180px;
`;

const Loding = styled.div`
  text-align: center;
  margin-top: 247px;
  font-family: 'Pretendard', sans-serif;
  font-size: var(--font-xs-size);
  color: var(--gray-400);
`;
