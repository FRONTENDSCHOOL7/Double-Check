import React, { useState, useRef } from 'react';
import StyledTextarea from './TextareaStyle';
import { useRecoilState } from 'recoil';
import { ContentState } from 'Recoil/ContentState';

const Textarea = () => {
  const [content, setContent] = useRecoilState(ContentState);
  const [height, setHeight] = useState('50px');
  const textareaRef = useRef(null);

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      const lines = textareaRef.current.value.split('\n').length;
      const newHeight = 20 * lines + 8;
      setHeight(50 + newHeight + 'px');
    }
  };

  const handleInputChange = (event) => {
    setContent(event.target.value);
    autoResizeTextarea();
  };

  return (
    <StyledTextarea
      style={{ height: height }}
      value={content}
      onChange={handleInputChange}
      onKeyDown={autoResizeTextarea}
      ref={textareaRef}
    />
  );
};

export default Textarea;
