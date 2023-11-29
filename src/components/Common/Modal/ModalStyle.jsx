import styled, { keyframes } from 'styled-components';
import { WhiteButton } from '../Button/ButtonStyle';

const fadeIn = keyframes`
  from {
    transform: translate(-50%, 100%);
  }
  to {
    transform: translate(-50%, -50%);
  }
`;

const ModalBackDrop = styled.div`
  position: fixed;
  background-color: rgba(51, 51, 51, 0.5);
  width: 390px;
  height: 100%;
  top: 0;
  z-index: 200;
`;

const ModalLayout = styled.div`
  position: fixed;
  width: 321px;
  background-color: var(--white);
  z-index: 220;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  animation: ${fadeIn} 0.2s ease;
  overflow: hidden;
`;

const ModalContent = styled.p`
  text-align: center;
  margin: 28px 0 22px 0;
  font-size: var(--font-sm-size);
  font-family: 'Pretendard-Medium', sans-serif;
  line-height: 1.2;
`;

const ModalCautionTxt = styled.span`
  color: var(--gray-500);
  font-size: var(--font-xs-size);
  margin-top: 10px;
`;

const ModalButton = styled(WhiteButton)`
  width: 50%;
  padding: 13px;
  margin: 0;
  border-radius: 0;
  font-size: var(--font-sm-size);
  border-top: 1px solid var(--gray-200);
`;

export { ModalBackDrop, ModalLayout, ModalContent, ModalCautionTxt, ModalButton };
