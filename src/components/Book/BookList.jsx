import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FeatureBanner } from 'Styles/FeatureStyle'; // FeatureBanner 컴포넌트를 가져옵니다

export default function BookList({ product }) {
  const { isbn13, cover, title, author, bestRank, bestDuration } = product;

  return (
    <Sli key={bestRank}>
      <Link to={`/book/${isbn13}`} state={{ product }}>
        <SImgbox>
          <img src={cover} alt={title} />
        </SImgbox>
        <StitleBox>
          <h2>{title}</h2>
          <p> {author}</p>
        </StitleBox>
        {bestDuration && <SInfo bestDuration={bestDuration} />}{' '}
      </Link>
    </Sli>
  );
}

const Sli = styled.li`
  width: 150px;
  margin: 10px auto;
  position: relative;
`;

const SImgbox = styled.div`
  width: 150px;
  height: 210px;
  border-radius: 10px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const StitleBox = styled.div`
  h2,
  p {
    margin-top: 5px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 1.3;
  }
  h2 {
    margin-top: 10px;
    font-size: 14px;
    -webkit-line-clamp: 2;
    height: 36px;
  }

  p {
    font-size: 12px;
    -webkit-line-clamp: 1;
    color: var(--gray-500);
  }
`;

const SInfo = styled(FeatureBanner)`
  content: ${(props) => props.bestDuration};
`;
