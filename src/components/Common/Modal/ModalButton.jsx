import React from 'react';
import Button from '../Button/Button';
import styled from 'styled-components';
import { ModalBackDrop } from './ModalStyle';

function ModalButton({ itemId = null, text = [], onClick = [], onCancel }) {
  return (
    <ModalButtonWrapper>
      <ModalBackDrop onClick={onCancel} />
      <ButtonGroup>
        {text.map((txt, index) => (
          <Button key={index} category='white' onClick={() => onClick[index](itemId)}>
            {txt}
          </Button>
        ))}
        <Button category='white' onClick={onCancel}>
          취소
        </Button>
      </ButtonGroup>
    </ModalButtonWrapper>
  );
}
export default ModalButton;

const ModalButtonWrapper = styled.div``;

const ButtonGroup = styled.div`
  position: fixed;
  bottom: 15px;
  z-index: 250;
  display: flex;
  flex-direction: column;
  left: 50%;
  transform: translateX(-50%);
`;
