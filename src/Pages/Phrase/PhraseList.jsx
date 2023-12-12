/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getPhraseListAPI } from 'API/phrase';
import styled from 'styled-components';
import Button from 'components/Common/Button/Button';
import { useGetInfinitePhrase, useDeletePhrase } from 'Hooks/usePhrase';
import { useNavigate } from 'react-router-dom';
import showMore from '../../assets/images/icon/show-more.svg';
import ModalButton from 'components/Common/Modal/ModalButton';
import Modal from 'components/Common/Modal/Modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { itemIdState } from 'Recoil/PhraseId';
import loginToken from 'Recoil/LoginToken';
import Topbar from 'components/Common/Topbar/Topbar';
import { showToast } from 'Hooks/useCustomToast';
import PhraseListSkeleton from 'assets/Skeleton/PhraseListSkeleton';
import userInfoState from 'Recoil/UserInfo';

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

export default function PhraseList() {
  const [expandedItem, setExpandedItem] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const token = useRecoilValue(loginToken);
  const userInfo = useRecoilState(userInfoState);
  const accountname = userInfo[0].accountname;

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [currentItemId, setCurrentItemId] = useRecoilState(itemIdState);

  const { deletePhraseMutate } = useDeletePhrase(currentItemId, token);
  const confirmDelete = () => {
    setIsModalVisible(false);
    setShowModal(true);
  };

  const handleEdit = () => {
    navigate(`/phraseupdate/${currentItemId}`);
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    console.log('삭제 버튼 클릭');
    deletePhraseMutate();
    setIsModalVisible(false); // 모달 숨기기
    setShowModal(false);
    showToast('해당 글귀가 삭제되었습니다.');
  };

  const handleCancel = () => {
    console.log('취소 버튼 클릭됨');
    setIsModalVisible(false); // 모달 숨기기
  };

  // 스프레드 연산자를 활용해 나머지 값은 그대로 저장하고 파라미터로 받은 id를 객체의 key 값으로 사용 -> 해당 값을 true/false로 바꿔서 넣어준다.
  const toggleExpandItem = (id) => {
    setExpandedItem((prevExpandedItem) => ({
      ...prevExpandedItem,
      [id]: !prevExpandedItem[id], // 기존 상태를 반전
    }));
  };

  const { phrase, allPhrase, fetchNextPhrase, hasNextPhrase } = useGetInfinitePhrase();
  console.log(allPhrase);
  console.log(allPhrase.map((item) => item.itemName));

  return (
    <>
      <Topbar
        title='글귀 목록'
        rightButton={
          <Button
            category='basic'
            shape='primary'
            type='button'
            onClick={() => navigate('/phrase/upload')}
          >
            작성
          </Button>
        }
      />
      <PhraseContainer>
        {allPhrase.length > 0 ? (
          <PhraseListUl>
            {allPhrase.map((item, index) => {
              console.log('authorId:  ' + item.author._id);
              console.log('userId:  ' + userId);
              const [bgColor, colorBox] = getColorPairByIndex(index);
              return (
                <PhraseListItem
                  key={index}
                  $bgcolor={bgColor}
                  onClick={() => toggleExpandItem(index)}
                >
                  <PhraseContents>
                    <PhraseItemBox $colorbox={colorBox} />
                    <PhraseArticle>
                      <PhraseTxt {...(expandedItem[index] ? { expanded: 'true' } : {})}>
                        {item.itemImage}
                      </PhraseTxt>
                    </PhraseArticle>
                  </PhraseContents>
                  <Options>
                    <PhraseInfo>
                      <p>{item.itemName.replace('@cc@', '')}</p>
                      <p>{item.link}</p>
                    </PhraseInfo>

                    {item.author.accountname === accountname ? (
                      <Button
                        category='basic'
                        shape='none'
                        onClick={() => {
                          setIsModalVisible(true);
                          setCurrentItemId(item._id);
                        }}
                      >
                        <img src={showMore} alt='더보기 아이콘' />
                      </Button>
                    ) : (
                      <Button category='basic' shape='none'>
                        저장
                      </Button>
                    )}
                  </Options>
                </PhraseListItem>
              );
            })}
            {hasNextPhrase && <div>로딩중</div>}
          </PhraseListUl>
        ) : (
          <PhraseListSkeleton />
        )}
      </PhraseContainer>
      {isModalVisible && (
        <ModalButton
          itemId={currentItemId} // 여기에서 currentItemId를 전달
          text={['글귀 수정', '글귀 삭제']}
          onClick={[handleEdit, confirmDelete]}
          onCancel={handleCancel}
        />
      )}
      <Modal
        content={'글귀를 삭제하시겠습니까?'}
        btnTxt='예'
        isVisible={showModal}
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
}

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
  background-color: ${({ $bgcolor }) => $bgcolor};
  border-radius: 12px;
  cursor: pointer;
`;

const PhraseContents = styled.div`
  display: flex;
  gap: 19px;
  margin-bottom: 21px;
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
  background-color: ${({ $colorbox }) => $colorbox};
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
  -webkit-line-clamp: 3;
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
