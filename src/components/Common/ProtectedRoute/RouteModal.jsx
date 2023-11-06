/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';

export default function RouteModal({ token, children }) {
  console.log(`token : ${token}`);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [token]); // 토큰이 변경될 때만 업데이트

  const goToLogin = () => {
    navigate('/loginPage');
  };

  const goToHome = () => {
    navigate('/main');
  };

  if (!token) {
    return (
      <>
        <Modal
          content='로그인이 필요한 페이지 입니다.'
          btnTxt='로그인'
          isVisible={showModal}
          onConfirm={() => goToLogin()}
          onCancel={() => goToHome()}
        />
      </>
    );
  }
  return children;
}
