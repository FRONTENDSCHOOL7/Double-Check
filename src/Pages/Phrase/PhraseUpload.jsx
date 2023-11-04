/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import loginToken from 'Recoil/LoginToken';
import { useRecoilState, useRecoilValue } from 'recoil';
import { phraseUpload } from 'API/phrase';
import { EditPhraseWrapper, EditPhraseForm, EditPhraseInput } from './PhraseEditStyle';
import Textarea from 'components/Common/Textarea/Textarea';
import { ContentState } from 'Recoil/ContentState';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Common/Button/Button';
import Modal from 'components/Common/Modal/Modal';
import Topbar from 'components/Common/Topbar/Topbar';
import { showToast } from 'Hooks/useCustomToast';

const PhraseEdit = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useRecoilState(ContentState);
  const [showModal, setShowModal] = useState(false);
  const token = useRecoilValue(loginToken);

  const handlePhraseUpload = async () => {
    const productData = {
      product: {
        itemName: title + '@cc@',
        price: 100,
        link: author,
        itemImage: content,
      },
    };

    const response = await phraseUpload(productData, token);
    console.log(productData);
    console.log(response.product.id);
    setShowModal(false);
    if (response) {
      setContent('');
      navigate('/phraselist');
      showToast('작성한 글귀가 등록되었습니다.');
    } else {
      showToast('글귀 등록에 실패했습니다.');
    }
  };

  const confirmUpload = (e) => {
    e.preventDefault();
    console.log('confirmUpload 함수 실행');

    if (title === '' || title.length < 1) {
      return showToast('제목을 입력해주세요.');
    } else if (author === '' || author.length < 1) {
      return showToast('저자를 입력해주세요.');
    } else if (content === '' || content.length < 1) {
      return showToast('내용을 입력해주세요.');
    }

    setShowModal(true);
  };

  return (
    <>
      <Topbar
        title='글귀 작성'
        rightButton={
          <Button category='basic' shape='primary' type='button' onClick={confirmUpload}>
            등록
          </Button>
        }
      />
      <EditPhraseWrapper>
        <EditPhraseForm>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='좋아하는 글귀나 문학적 표현을 공유해보세요.'
          />
          <EditPhraseInput
            type='text'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목을 입력해주세요.'
          />
          <EditPhraseInput
            type='text'
            name='author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder='저자를 입력해주세요.'
          />
        </EditPhraseForm>
      </EditPhraseWrapper>

      {/* <Button category='basic' shape='primary' type='button' onClick={confirmUpload}>
        등록
      </Button> */}
      <Modal
        content='글귀를 등록하시겠습니까?'
        btnTxt='예'
        isVisible={showModal}
        onConfirm={handlePhraseUpload}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default PhraseEdit;
