import React from 'react';
import styled from 'styled-components';
import galleryIcon from '../../../assets/images/icon/icon-gallery.svg';
import feedIcon from '../../../assets/images/icon/icon-feed.svg';

const StyledImage = styled.img`
  width: 20px;
  height: auto;
  margin: 0 10px;
`;

const ViewToggleButton = ({ view, toggleView }) => (
  <button onClick={toggleView}>
    {view === 'feed' ? (
      <StyledImage src={galleryIcon} alt='갤러리 뷰' />
    ) : (
      <StyledImage src={feedIcon} alt='피드 뷰' />
    )}
  </button>
);

export default ViewToggleButton;
