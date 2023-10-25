/* eslint-disable react/react-in-jsx-scope */
import { StyledButton, WhiteButton } from "./ButtonStyle";

function Button({
  shape,
  color,
  danger,
  category,
  disabled = false,
  children,
  type = "button",
  txt = [],
}) {
  const button = {
    basic: (
      <StyledButton shape={shape} type={type} color={color} disabled={disabled}>
        {children}
      </StyledButton>
    ),
    white: (
      <WhiteButton
        type={type}
        color={color}
        disabled={disabled}
        danger={danger}
      >
        {children}
      </WhiteButton>
    ),
    list: (
      <div>
        <ul>
          {txt.map((item, index) => (
            <li key={index}>
              <WhiteButton
                danger={item.includes("삭제") || item.includes("종료")}
              >
                {item}
              </WhiteButton>
            </li>
          ))}
        </ul>
        <WhiteButton>{children}</WhiteButton>
      </div>
    ),
  };

  return button[category];
}

export default Button;
