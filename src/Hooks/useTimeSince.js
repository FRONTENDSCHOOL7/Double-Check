import { useEffect, useState } from 'react';

function useTimeSince(dateString) {
  // 서버 시간을 로컬 시간으로 변환하는 함수
  const convertToLocalTime = (dateString) => {
    let serverTime = new Date(dateString);
    if (isNaN(serverTime.getTime())) {
      // 유효하지 않은 날짜인 경우
      // 에러 처리 또는 대체값 리턴
      return null;
    }
    return serverTime;
  };

  const [timeSince, setTimeSince] = useState('');

  useEffect(() => {
    const updateTimeSince = () => {
      const now = new Date();
      const past = convertToLocalTime(dateString);

      // 유효하지 않은 날짜를 처리
      if (!past) {
        setTimeSince('유효하지 않은 날짜');
        return;
      }

      const diff = now - past;
      const minute = 60 * 1000;
      const hour = minute * 60;
      const day = hour * 24;

      let newTimeSince;
      if (diff < minute) {
        newTimeSince = '방금 전';
      } else if (diff < hour) {
        newTimeSince = Math.round(diff / minute) + '분 전';
      } else if (diff < day) {
        newTimeSince = Math.round(diff / hour) + '시간 전';
      } else if (diff < day * 3) {
        newTimeSince = Math.round(diff / day) + '일 전';
      } else {
        newTimeSince = past.toLocaleDateString('ko-KR'); // "YYYY년 MM월 DD일" 형식
      }

      setTimeSince(newTimeSince);
    };

    updateTimeSince();
    const interval = setInterval(updateTimeSince, 60000); // 1분마다 업데이트
    return () => clearInterval(interval); // Cleanup
  }, [dateString]);

  return timeSince;
}

export default useTimeSince;
