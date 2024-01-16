/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userInfoState from 'Recoil/UserInfo';
import { useRecoilValue } from 'recoil';
import eggIcon from '../assets/images/icon/icon-egg.png';
import curveIcon from '../assets/images/icon/icon-curve.png';
import meteorIcon from '../assets/images/icon/icon-meteor.png';
import saturnIcon from '../assets/images/icon/icon-saturn.png';
import styled from 'styled-components';
import { getBooksRead, getUserReadingGoal, setUserReadingGoal } from '../firebase/firebaseService';
import Modal from './Common/Modal/Modal';
import { showToast } from 'Hooks/useCustomToast';
import useReadingList from 'Hooks/useReadingList';

const ManuTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [goal, setGoal] = useState(0);
  const [readBooks, setReadBooks] = useState(0);
  const userInfo = useRecoilValue(userInfoState);
  const userId = userInfo ? userInfo.id : null;
  const { readingList } = useReadingList(userId);

  const fetchReadingGoal = async () => {
    const userReadingGoal = await getUserReadingGoal(userId);
    setGoal(userReadingGoal || 0);
  };

  const fetchReadBooks = async () => {
    const userReadBooks = await getBooksRead(userId);
    setReadBooks(userReadBooks.length || 0);
  };

  useEffect(() => {
    fetchReadingGoal();
    fetchReadBooks();
  }, [userId]);

  const saveReadingGoal = async () => {
    if (goal > 0 && goal < 10000) {
      await setUserReadingGoal(userId, goal);
    } else {
      showToast('목표를 확인해주세요!');
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section>
      <ManuList>
        <li>
          <SMaunTabs aria-label='올해 독서 목표' onClick={openModal}>
            <SMaunTabBox>
              <STabIcon src={curveIcon} alt='올해 목표 탭' />
              <SMaunTabSpan>독서 목표</SMaunTabSpan>
              <SMaunTabSpan>
                <strong>{goal}</strong> 권
              </SMaunTabSpan>
            </SMaunTabBox>
          </SMaunTabs>
        </li>
        <li>
          <SMaunTabs to='/book/booksread' aria-label='읽은 책'>
            <SMaunTabBox>
              <STabIcon src={saturnIcon} alt='읽은 책 탭' />
              <SMaunTabSpan>읽은 책</SMaunTabSpan>
              <SMaunTabSpan>
                <strong>{readBooks}</strong> 권
              </SMaunTabSpan>
            </SMaunTabBox>
          </SMaunTabs>
        </li>
        <li>
          <SMaunTabs to='/book/mybookshelf' aria-label='저장한 책'>
            <SMaunTabBox>
              <STabIcon src={eggIcon} alt='저장한 책 탭' />
              <SMaunTabSpan>저장한 책</SMaunTabSpan>
              <SMaunTabSpan>
                <strong>{readingList.length}</strong> 권
              </SMaunTabSpan>
            </SMaunTabBox>
          </SMaunTabs>
        </li>
      </ManuList>
      {showModal && (
        <Modal
          content={
            <>
              <ModalTitle>올해 독서 목표를 설정하세요!</ModalTitle>
              <SGoalInput
                type='number'
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
              />
              권
            </>
          }
          onConfirm={() => {
            saveReadingGoal();
            closeModal();
          }}
          btnTxt='수정'
          isVisible={showModal}
          onCancel={closeModal}
        />
      )}
    </section>
  );
};

const ManuList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0px 10px;
  justify-items: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
`;

const SMaunTabBox = styled.div`
  width: 110px;
  height: 110px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 6px;
`;
const SMaunTabs = styled(Link)``;

const STabIcon = styled.img`
  width: 35px;
  margin-bottom: 5px;
`;

const SMaunTabSpan = styled.span`
  strong {
    font-size: var(--font-sm-size);
    color: var(--black);
    font-family: 'Pretendard-SemiBold';
  }
`;

const SGoalInput = styled.input`
  width: 31%;
  font-size: var(--font-lg-size);
  text-align: center;
  font-family: 'Pretendard-SemiBold';
`;

export default ManuTab;
