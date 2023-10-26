import React, { useState, useRef } from 'react';
import StyledTextarea from './TextareaStyle';

const Textarea = () => {
  const [text, setText] = useState('');
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
    setText(event.target.value);
    autoResizeTextarea();
  };

  return (
    <StyledTextarea
      style={{ height: height }}
      value={text}
      onChange={handleInputChange}
      onKeyDown={autoResizeTextarea}
      ref={textareaRef}
    />
  );
};

export default Textarea;
