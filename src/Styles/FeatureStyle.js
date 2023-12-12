import styled, { css } from 'styled-components';

export const FeatureBanner = styled.div`
  margin: 20px;

  ${({ $bestduration }) => css`
    &:before {
      content: '${$bestduration}';
      position: absolute;
      top: 1px;
      left: -8px;
      padding-right: 10px;
      color: #fff;
      font-weight: bold;
      height: 0;
      border: 12px solid #471bb2;
      border-right-color: transparent;
      line-height: 0;
      box-shadow: 0px 5px 5px -5px #000;
      z-index: 1;
      font-size: small;
    }
  `}

  &:after {
    content: '';
    position: absolute;
    top: 25px;
    left: -8px;
    border: 4px solid #311a68;
    border-left-color: transparent;
    border-bottom-color: transparent;
  }
`;
