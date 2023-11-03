import styled from 'styled-components';

const StyledTextarea = styled.textarea`
<<<<<<< HEAD
  overflow: hidden;
  border: none;
=======
>>>>>>> develop
  padding: 10px;
  outline: none;
  resize: none;
  line-height: 1.5;
  font-size: var(--font-sm-size);
  /* min-height: ${(props) => props.height}; */
  border-bottom: 1px solid var(--gray-200);
  border: ${(props) => props.border};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

export default StyledTextarea;
