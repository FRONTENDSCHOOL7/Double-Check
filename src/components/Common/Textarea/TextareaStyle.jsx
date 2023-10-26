import styled from 'styled-components';

const StyledTextarea = styled.textarea`
  padding: 10px;
  outline: none;
  resize: none;
  line-height: 1.5;
  font-size: var(--font-xs-size);
  min-height: ${(props) => props.height};
`;

export default StyledTextarea;
