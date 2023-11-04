/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { StyledButton, WhiteButton, SideLoginBtn } from './ButtonStyle';

function Button({
  shape,
  color,
  danger,
  category,
  disabled = false,
  children,
  type = 'button',
  text = [],
  onClick,
  padding,
  backgroundColor,
}) {
  const button = {
    basic: (
      <StyledButton
        shape={shape}
        type={type}
        color={color}
        disabled={disabled}
        onClick={onClick}
        backgroundColor={backgroundColor}
      >
        {children}
      </StyledButton>
    ),
    white: (
      <WhiteButton
        type={type}
        color={color}
        disabled={disabled}
        danger={danger}
        onClick={onClick}
        padding={padding}
      >
        {children}
      </WhiteButton>
    ),
    list: (
      <div>
        <ul>
          {text.map((item, index) => (
            <li key={index}>
              <WhiteButton
                danger={item.includes('삭제') || item.includes('종료')}
                onClick={onClick}
              >
                {item}
              </WhiteButton>
            </li>
          ))}
        </ul>
        <WhiteButton onClick={onClick}>{children}</WhiteButton>
      </div>
    ),
    sidebarBtn: <SideLoginBtn onClick={onClick}>{children}</SideLoginBtn>,
  };

  return button[category];
}

export default Button;
