import React, { useState } from 'react';
import StyledTextarea from './TextareaStyle';

const Textarea = () => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return <StyledTextarea value={text} onChange={handleChange} text={text} />;
};

export default Textarea;
