import styled from 'styled-components';

export const InputBox = styled.input`
  border: 1px solid ${(props) => (props.hasError ? 'red' : 'var(--gray-300)')};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 15px;
  box-sizing: border-box;
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${(props) => props.radius};
  &::placeholder {
    color: var(--gray-500);
  }
  &:focus {
    border-color: var(--main-purple);
  }
`;
