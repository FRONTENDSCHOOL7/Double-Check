import styled from 'styled-components';

const StyledTextarea = styled.textarea`
  padding: 10px;
  outline: none;
  resize: none;
  line-height: 1.5;
  font-size: var(--font-sm-size);
  /* min-height: ${(props) => props.height}; */
  border-bottom: 1px solid var(--gray-300);
  flex: 1;
`;

export default StyledTextarea;
