/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import StyledTextarea from './TextareaStyle';
import { useRecoilState } from 'recoil';
import { ContentState } from 'Recoil/ContentState';

const Textarea = ({ placeholder }) => {
  const [content, setContent] = useRecoilState(ContentState);
  const textareaRef = useRef(null);

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <StyledTextarea
      value={content}
      onChange={handleInputChange}
      placeholder={placeholder}
      ref={textareaRef}
    />
  );
};

export default Textarea;
