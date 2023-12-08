import React from 'react';
import styled from 'styled-components';
import BestPostItem from './BestPostItem';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useSortedPosts } from 'Recoil/BestPosts';
import { calculatedColorState } from 'Recoil/PostColor';
const BestPost = () => {
  const sortedPosts = useSortedPosts();

  const getCalculatedColor = useRecoilValue(calculatedColorState);

  const renderBestPostItems = React.useMemo(
    () =>
      sortedPosts.map((item, index) => (
        <BestPostItem color={getCalculatedColor(index)} key={item._id} item={item} id={item._id} />
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
          <SLink>
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
  padding: 10px;
`;
const SBestPostList = styled.section`
  margin-top: 25px;
`;

const SHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0px 15px;

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
