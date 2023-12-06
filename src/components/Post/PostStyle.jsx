/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SPostArticle = styled.article`
  margin-bottom: 59px;

  &:first-of-type {
    margin-top: 26px;
  }
`;

const SPostHeader = styled.header`
  padding: 0 21px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const SLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: var(--gray-500);

  & > span:first-of-type {
    font-family: 'Pretendard-SemiBold';
    color: var(--black);
  }
`;

const SPostSection = styled.section`
  margin: 12px 0 16px;
  position: relative;
  gap: 41px;
`;

const SPostText = styled.p`
  margin: 33px 0 12px;
  font-family: 'Pretendard-regular', sans-serif;
  padding: 0 21px;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const SPostImg = styled.img`
  max-width: 100%;
  max-height: 93%;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 12%);
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
`;

const SProfileImg = styled.img`
  height: 42px;
  width: 42px;
  border-radius: 50%;
  border: 1px solid var(--gray-300);
`;

const SPostSpan = styled.span``;

const SPostFooter = styled.footer`
  padding: 12px 21px;
  display: flex;
  justify-content: space-between;
  color: var(--gray-400);
  font-family: 'Pretendard-regular', sans-serif;
  border-top: 1px solid var(--gray-200);
`;

const SButtonGroup = styled.div``;

const SPostbutton = styled.button`
  margin-right: 10px;
`;

const SShowMore = styled.button`
  margin-left: auto;
  padding: 0 10px;
`;

const SImgWrapper = styled.div`
  position: relative;
  border-radius: 4px;
  height: 267px;
  background: ${(props) =>
    Array.isArray(props.color)
      ? `linear-gradient(${props.color[0]}, ${props.color[1]})`
      : props.color};
`;

export {
  SPostArticle,
  SPostHeader,
  SLink,
  SPostSection,
  SPostText,
  SPostImg,
  SProfileImg,
  SPostSpan,
  SPostFooter,
  SPostbutton,
  SShowMore,
  SImgWrapper,
  SButtonGroup,
};
