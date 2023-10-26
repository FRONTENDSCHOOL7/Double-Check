import styled from 'styled-components';

const StyledTextarea = styled.textarea`
  height: ${({ text }) => `${20 * (text.split('\n').length + 1)}px`};
  overflow: hidden;
  border: none;
  padding: 10px;
  outline: none;
  resize: none;
  line-height: 1.5;
  font-size: var(--font-xs-size);
  height: ${({ text }) => `${20 * (text.split('\n').length + 1)}px`};
`;

export default StyledTextarea;
