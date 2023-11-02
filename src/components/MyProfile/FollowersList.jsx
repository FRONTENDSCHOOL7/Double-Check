import React, { useState, useEffect } from 'react';

function FollowersList({ accountName }) {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("토큰이 없습니다. 로그인이 필요합니다.");
        return;
      }

      if (!accountName) {
        console.error("계정 이름이 지정되지 않았습니다.");
        return;
      }

      try {
        const response = await fetch(`https://api.mandarin.weniv.co.kr/profile/${accountName}/follow`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }

        const data = await response.json();
        setFollowers(data.follower); // 이 부분은 실제 API 응답 구조에 따라 달라질 수 있습니다.
        console.log(followers);
      } catch (error) {
        console.error('Followers 목록을 불러오는 중 오류가 발생했습니다:', error);
      }
    };
  }, [accountName]);

  return (
    <div>
      {followers.map(follower => (
        <div key={follower._id}>{follower.username}</div> // 'id'와 'username'은 예시입니다. 실제 데이터 구조에 맞게 조정하세요.
      ))}
    </div>
  );
}

export default FollowersList;