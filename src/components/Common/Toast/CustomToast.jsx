import React, { useEffect } from 'react';
import styled from 'styled-components';

export default function CoustomToast({ setToast, text }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <ToastContainer>
      <ToastLayout>{text}</ToastLayout>
    </ToastContainer>
  );
}

const ToastContainer = styled.div`
  position: fixed;
  left: 50%;
  top: -100px;
  transform: translateX(-50%);
  z-index: 100;
  animation: slideUp 1s ease-in-out;
  white-space: nowrap;
`;

const ToastLayout = styled.div`
  color: #ffffff;
  font-size: small;
  padding: 1em 5em;
  border-radius: 8px;
  background-color: #141111e0;
  display: flex;
  align-items: center;

  @keyframes slideUp {
    0% {
      top: -100px;
      opacity: 0;
    }
    50% {
      top: 20px;
      opacity: 1;
    }
    90% {
      top: 20px;
      opacity: 1;
    }
    100% {
      opacity: 0.8;
      top: -10px;
    }
  }
`;
