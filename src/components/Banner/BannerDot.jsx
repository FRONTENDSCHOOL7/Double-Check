import React from 'react';
import styled from 'styled-components';

const DotContainer = styled.div`
  text-align: center;
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
`;

const Dot = styled.span`
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#8e8e8e' : '#b9b9b9')};
  margin: 0 5px;
  cursor: pointer;
  opacity: 0.7;
`;

function BannerDot({ banners, currentSlide, goToSlide }) {
  return (
    <DotContainer>
      {banners.map((_, index) => (
        <Dot key={index} active={index === currentSlide} onClick={() => goToSlide(index)} />
      ))}
    </DotContainer>
  );
}

export default BannerDot;
