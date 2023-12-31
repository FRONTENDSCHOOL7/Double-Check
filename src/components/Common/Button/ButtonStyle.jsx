import styled, { css } from 'styled-components';

const Button = styled.button`
  margin: 0;
  border: none;
  cursor: pointer;
  font-size: var(--font-xm-size);
  padding: 7px 16px;
  line-height: 1;
  background-color: ${(props) => props.backgroundColor || 'var(--main-purple)'};
  color: var(--white);
  border-radius: 25px;
  text-align: center;

  &:active,
  &:hover,
  &:focus {
    background-color: ${(props) => props.backgroundColor || 'var(--dark-purple)'};
  }

  &:disabled {
    cursor: default;
    opacity: 0.45;
    background-color: var(--main-purple);
  }
`;

const StyledButton = styled(Button)`
  ${(props) => {
    if (props.shape === 'primary') {
      return css`
        font-size: var(--font-xm-size);
        font-weight: 400;
        padding: 8px 19px;
        border-radius: 25px;
      `;
    } else if (props.shape === 'sub') {
      return css`
        font-size: var(--font-sm-size);
        font-weight: 400;
        padding: 10px 25px;
        border-radius: 25px;
      `;
    } else if (props.shape === 'big') {
      return css`
        font-size: var(--font-sm-size);
        font-weight: 500;
        width: 100%;
        padding: 12px 40px;
        border-radius: 10px;
      `;
    } else if (props.shape === 'xsmall') {
      return css`
        font-size: var(--font-xxs-size);
        font-weight: 300;
        width: 80px;
        border-radius: 30px;
        background-color: ${(props) => props.backgroundColor};
      `;
    } else if (props.shape === 'none') {
      return css`
        font-size: var(--font-xxs-size);
        background: none;
        color: var(--black);
        height: 27px;
        padding: 6px;
        min-width: 40px;
        &:active,
        &:hover,
        &:focus {
          background-color: var(--white);
        }
      `;
    }
  }}
`;

const WhiteButton = styled(Button)`
  font-size: var(--font-sm-size);
  font-weight: 400;
  width: 312px;
  padding: ${(props) => (props.padding ? '15px 88px' : '15px 120px')};
  border-radius: 8px;
  color: ${(props) => (props.danger ? 'var(--danger-color)' : 'var(--black)')};
  background-color: var(--white);
  margin: 2px 0;
  &:active,
  &:hover,
  &:focus {
    background-color: var(--gray-200);
  }
`;
const SideLoginBtn = styled(Button)`
  display: block;
  height: 48px;
  border: none;
  cursor: pointer;
  font-size: var(--font-xm-size);
  padding: 14px 30px;
  line-height: 1;
  background-color: var(--main-purple);
  color: var(--white);
  border-radius: 25px;
  text-align: center;
`;

export { StyledButton, WhiteButton, SideLoginBtn };
