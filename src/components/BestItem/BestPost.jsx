import React, { lazy } from 'react';
import styled from 'styled-components';
// import BestPostItem from './BestPostItem';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useSortedPosts } from 'Recoil/BestPosts';
import { calculatedColorState } from 'Recoil/PostColor';

const BestPostItem = lazy(() => import('./BestPostItem'));
const BestPost = () => {
  const sortedPosts = useSortedPosts();

  const getCalculatedColor = useRecoilValue(calculatedColorState);

  const renderBestPostItems = React.useMemo(
    () =>
      sortedPosts
        .slice(0, 5)
        .map((item, index) => (
          <BestPostItem
            color={getCalculatedColor(index)}
            key={item._id}
            item={item}
            id={item._id}
          />
        )),
    [sortedPosts, getCalculatedColor],
  );
  return (
    <SBestPostList>
      <SHeader>
        <div>
          <h2>
            <div>주목받는 피드</div>
          </h2>
        </div>
        <div>
          <SLink to={`/post`}>
            <p>전체보기</p>
          </SLink>
        </div>
      </SHeader>

      <SBestPostListItem>{renderBestPostItems}</SBestPostListItem>
    </SBestPostList>
  );
};
export default BestPost;
const SBestPostListItem = styled.div`
  display: flex;
  overflow: auto;
  gap: 10px;
  padding: 1px 0px 1px 15px;
`;
const SBestPostList = styled.section`
  margin-top: 30px;
`;

const SHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0px 15px;

  margin-bottom: 20px;

  h2 {
    font-size: var(--font-sm-size);
    font-weight: 800;
    color: #2a2d31;
  }

  p {
    color: var(--gray-500);
    line-height: 1;
    font-size: var(--font-xxs-size);
  }
`;

const SLink = styled(Link)``;
