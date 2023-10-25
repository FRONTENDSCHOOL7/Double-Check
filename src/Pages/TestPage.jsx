import React from 'react';
import Button from 'components/Common/Button/Button';
import Modal from 'components/Common/Modal/Modal';

import { ToastContainer } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { modalIsOpenAtom } from 'atoms/modal';

import Toast from 'components/Common/Toast/Toast';
// import RemoveButton from 'components/Common/Toast/Buttons/RemoveButton';

function TestPage() {
  const [modalIsOpen, setModalIsOpen] = useRecoilState(modalIsOpenAtom);

  const handleOpenModal = () => {
    setModalIsOpen(true);
    console.log(modalIsOpen);
  };

  return (
    <div>
      <Toast message='내 글귀 목록에 저장되었습니다.' />
      <Toast success={false} message='글귀 추가에 실패했습니다.' />
      <ToastContainer />
      <section>
        <button onClick={handleOpenModal}>모달열기1</button>
        <Modal
          content='글귀를 수정하시겠습니까?'
          caution='종료를 선택하면 수정이 완료되지 않습니다.'
          btnTxt='삭제'
        />
      </section>

      <section>
        <Button category='basic' shape='primary'>
          등록
        </Button>
        <Button category='basic' shape='sub'>
          책 보러 가기
        </Button>
        <Button category='basic' shape='big'>
          이메일로 로그인하기
        </Button>
        <Button category='basic' shape='big' disabled>
          로그인
        </Button>
        <Button category='white'>취소</Button>
        <Button category='list' txt={['대표 글귀 설정', '글귀 수정', '글귀 삭제']}>
          취소
        </Button>
      </section>
    </div>
  );
}

export default TestPage;
