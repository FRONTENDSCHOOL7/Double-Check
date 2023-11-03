import { useEffect, useState } from 'react';

function useTimeSince(dateString) {
  const convertToLocalTime = (dateString) => {
    // 서버 시간(UTC 기준)을 Date 객체로 변환
    const serverTime = new Date(dateString);
    // 로컬 시간으로의 변환
    const localTime = new Date(serverTime.getTime() + serverTime.getTimezoneOffset() * 60000);
    return localTime;
  };

  const currentTimeSince = () => {
    const now = new Date();
    const past = convertToLocalTime(dateString);
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;

    const diff = now - past;

    if (diff < minute) {
      return '방금 전';
    } else if (diff < hour) {
      return Math.round(diff / minute) + '분 전';
    } else if (diff < day) {
      return Math.round(diff / hour) + '시간 전';
    } else if (diff < day * 3) {
      return Math.round(diff / day) + '일 전';
    } else {
      // 3일 이상 지났을 때 연월일 포맷
      return past.toISOString().split('T')[0];
    }
  };

  const [timeSince, setTimeSince] = useState(currentTimeSince());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSince(currentTimeSince());
    }, 60000); // 1분마다 업데이트

    return () => clearInterval(timer);
  }, [dateString]);

  return timeSince;
}

export default useTimeSince;
