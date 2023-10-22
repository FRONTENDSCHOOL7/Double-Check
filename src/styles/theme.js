const colors = {
  lightPurple: "#F2F2FF",
  mediumPurple: "#C9B9FF",
  mainPurple: "#B29AFF",
  darkPurple: "#471BB2",
  lightBlue: "#F2F4FF",
  mediumBlue: "#D2D8FA",
  lightGreen: "#E2FFFB",
  mediumGreen: "#AFEEE3",
  lightPink: "#FDEAEC",
  mediumPink: "#FFD2D9",
  lightOrange: "#FCF2E8",
  mediumOrange: "#FFC7A7",
  darkOrange: "#FF6C6C",
  gray100: "#F8F8F8",
  gray200: "#D9D9D9",
  gray300: "FFFFFF",
  gray400: "#EFEFEF",
  gray500: "646464",
};

const fontSize = {
  xs: "1.2rem",
  sm: "1.4rem",
  base: "1.6rem",
  md: "1.8rem",
  lg: "2.4rem",
};

const theme = { colors, fontSize };

export default theme;

// ThemeProvider는 ContextAPI를 이용해 리액트 컴포넌트에게 Theme 속성을 전달

/* const ColoredP = styled.p`
 * color: ${({theme})=> theme.colors.gray100};
 * `
 */
