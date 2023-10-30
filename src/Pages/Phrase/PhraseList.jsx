import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getPhraseListAPI } from 'API/phrase';
import styled from 'styled-components';
import Button from 'components/Common/Button/Button';
import Topbar from 'components/Common/TopBar';
const colors = [
  ['#F2F6FF', '#D2D8FA'],
  ['#E2FFFB', '#AFEEE3'],
  ['#FDEAEC', '#FFD2D9'],
  ['#FCF2E8', '#FFC7A7'],
  ['#F3EAFF', '#DCC1FF'],
  ['#FAE7FF', '#EDA9FF'],
  ['#F1FFE7', '#C0F3AE'],
  ['#E7FFF3', '#9DE8C2'],
  ['#ECFFC5', '#D1F18F'],
  ['#FEFFDB', '#FFF175'],
];

const getColorPairByIndex = (index) => {
  const adjustedIndex = index % colors.length;
  return colors[adjustedIndex];
};

const PhraseList = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [expandedItem, setExpandedItem] = useState({});

  // 스프레드 연산자를 활용해 나머지 값은 그대로 저장하고 파라미터로 받은 id를 객체의 key 값으로 사용 -> 해당 값을 true/false로 바꿔서 넣어준다.
  const toggleExpandItem = (id) => {
    setExpandedItem((prevExpandedItem) => ({
      ...prevExpandedItem,
      [id]: !prevExpandedItem[id], // 기존 상태를 반전
    }));
  };

  // eslint-disable-next-line no-unused-vars
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'productData',
    getPhraseListAPI,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? undefined : lastPage.nextPage;
      },
      enabled: filteredProducts.length === 0, // 처음 컴포넌트가 마운트될 때만 쿼리 실행
      onSuccess: (newData) => {
        let allProducts = [];
        let initialExpandedState = {};
        newData.pages.forEach((page) => {
          allProducts = allProducts.concat(page.product);
          page.product.forEach((product) => {
            initialExpandedState[product.id] = false; // 모든 상품을 접힌 상태로 초기화
          });
        });

        // '@cc@' 포함된 것만 필터링
        const filteredAndUniqueProducts = allProducts.filter(
          (product) =>
            product.itemName?.includes('@cc@') &&
            !filteredProducts.some((existingProduct) => existingProduct.id === product.id),
        );

        setFilteredProducts(filteredAndUniqueProducts);
      },
    },
  );

  useEffect(() => {
    const handleScroll = () => {
      // 화면 끝에 도달했는지 확인
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;

      // 다음 페이지가 있으면 데이터 불러오기
      if (hasNextPage) fetchNextPage();
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);
    return () => {
      // cleanup
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <>
      <Topbar centerEl='writelist' leftEl='writelist' rightEl='writelist' />
      <PhraseContainer>
        {filteredProducts.length > 0 ? (
          <PhraseListUl>
            {filteredProducts.map((product, index) => {
              const [bgColor, colorBox] = getColorPairByIndex(index);
              return (
                <PhraseListItem
                  key={index}
                  bgcolor={bgColor}
                  onClick={() => toggleExpandItem(index)}
                >
                  <PhraseContents>
                    <PhraseItemBox colorbox={colorBox} />
                    <PhraseArticle>
                      <PhraseTxt {...(expandedItem[index] ? { expanded: 'true' } : {})}>
                        {product.itemImage}
                      </PhraseTxt>
                    </PhraseArticle>
                  </PhraseContents>
                  <Options>
                    <PhraseInfo>
                      <p>{product.itemName.replace('@cc@', '')}</p>
                      <p>{product.link}</p>
                    </PhraseInfo>
                    <Button category='basic' shape='none'>
                      저장
                    </Button>
                  </Options>
                </PhraseListItem>
              );
            })}
          </PhraseListUl>
        ) : (
          <p>글귀가 없습니다.</p>
        )}
      </PhraseContainer>
    </>
  );
};

export default PhraseList;

const PhraseContainer = styled.section`
  font-family: 'Pretendard-Regular', sans-serif;
  padding: 5px 20px;
`;
const PhraseListUl = styled.ul`
  list-style: none;
`;
const PhraseListItem = styled.li`
  margin: 22px 0;
  padding: 23px 20px 20px 23px;
  background-color: ${(props) => props.bgcolor};
  border-radius: 12px;
  cursor: pointer;
`;

const PhraseContents = styled.div`
  display: flex;
  gap: 19px;
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: flex-end;
`;

const PhraseItemBox = styled.div`
  content: '';
  display: block;
  min-width: 34px;
  height: 34px;
  background-color: ${(props) => props.colorbox};
  border-radius: 5px;
`;

const PhraseArticle = styled.article`
  width: 100%;
`;
const PhraseInfo = styled.div`
  color: var(--gray-500);
  text-align: right;
  margin-right: 10px;
  line-height: 1.4;
`;

const PhraseTxt = styled.p`
  line-height: 1.2;
  margin-bottom: 13px;
  text-align: justify;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition:
    max-height 2s ease,
    opacity 0.7s ease,
    transform 0.7s ease;
  max-height: 100px;
  transform-origin: top;

  /* 말 줄임표 해제 스타일 */
  ${({ expanded }) =>
    expanded &&
    `
    -webkit-line-clamp: unset;
    -webkit-box-orient: unset;
    max-height: 1000px; 
    opacity: 1;
  `}
`;

// const SaveButton = styled(Button)`
//   font-size: var(--font-xs-size);
//   font-family: 'Pretendard-Regular', sans-serif;
// `;
