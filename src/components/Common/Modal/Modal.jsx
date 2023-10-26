import React from 'react';
import { useRecoilState } from 'recoil';
import { modalIsOpenAtom } from 'atoms/modal';
import {
  ModalBackDrop,
  ModalLayout,
  ModalContent,
  ModalCautionTxt,
  ModalButton,
} from './ModalStyle';

const Modal = ({ content, caution, btnTxt }) => {
  const [modalIsOpen, setModalIsOpen] = useRecoilState(modalIsOpenAtom);

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      {modalIsOpen && (
        <>
          <ModalBackDrop onClick={handleModalClose} role='presentation' />
          <ModalLayout>
            <ModalContent>
              {content}
              <ModalCautionTxt>{caution}</ModalCautionTxt>
            </ModalContent>
            <ModalButton onClick={() => setModalIsOpen(false)}>취소</ModalButton>
            <ModalButton>{btnTxt}</ModalButton>
          </ModalLayout>
        </>
      )}
    </>
  );
};

export default Modal;
