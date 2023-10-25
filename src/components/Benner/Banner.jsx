import React from 'react';
import styled from 'styled-components';

export default function Banner({ data }) {
  // const [currentIndex, setCurrentIndex] = useState(1);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const nextIndex = (currentIndex + 1) % data.length;
  //     setCurrentIndex(nextIndex);
  //   }, 5000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [currentIndex, data]);

  return (
    <SBannerContainer>
      {data.map((item, idx) => (
        <SBannerItem key={idx} bgcolor={item.color} bgImg={item.img}>
          <span>{item.message}</span>
          <button>바로가기</button>
        </SBannerItem>
      ))}

      <SnavBtnWrapper>
        <SnavBtn />
        <SnavBtn />
        <SnavBtn />
      </SnavBtnWrapper>
    </SBannerContainer>
  );
}

const SBannerContainer = styled.section`
  /* overflow: hidden; */

  height: 200px;
  display: flex;
  transition: transform 0.5s;
  position: relative;
  transform: translateX(-319px);
`;

const SBannerItem = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImg});
  background-size: auto;
  background-repeat: no-repeat;
  background-color: ${(props) => props.bgcolor};
  background-position: 95%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 20px;
  span {
    margin-bottom: 10px;
  }
`;
const SnavBtnWrapper = styled.div`
  z-index: 3;
  position: absolute;
  display: flex;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
`;
const SnavBtn = styled.button`
  background-color: #c8c8c8;
  width: 5px;
  height: 5px;
  margin: 4px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.5;
  &:hover {
    transform: scale(1.2);
    background-color: #7b7a7a;
  }

  &:active {
    opacity: 1;
    scale: 1.2;
  }
`;
