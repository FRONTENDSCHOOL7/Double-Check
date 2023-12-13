import styled from 'styled-components';

const LayoutStyle = styled.div`
  margin: 0 auto;
  width: 390px;
  height: 100vh;
  background-color: white;
  padding-top: 70px;
  padding-bottom: 86px;
  overflow: scroll;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default LayoutStyle;
