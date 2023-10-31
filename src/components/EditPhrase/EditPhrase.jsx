/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import loginToken from 'Recoil/LoginToken';
import { useRecoilState, useRecoilValue } from 'recoil';
import { phraseAPI } from 'API/phrase';
import { EditPhraseWrapper, EditPhraseForm, EditPhraseInput } from './EditPhraseStyle';
import Textarea from 'components/Common/Textarea/Textarea';
import { ContentState } from 'Recoil/ContentState';
import { useNavigate } from 'react-router-dom';
// import Button from 'components/Common/Button/Button';
import useToast from 'Hooks/useToast';
import Modal from 'components/Common/Modal/Modal';
import Topbar from 'components/Common/TopBar';

const EditPhrase = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useRecoilState(ContentState);
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

    const response = await phraseAPI(productData, token);
    console.log(productData);
    console.log(response.product.id);
    setShowModal(false);
    if (response) {
      navigate('/phraselist');
    }
  };

  const confirmUpload = (e) => {
    e.preventDefault();
    console.log('confirmUpload 함수 실행');

    if (title === '' || title.length < 1) {
      return useToast('제목을 입력해주세요.');
    } else if (author === '' || author.length < 1) {
      return useToast('저자를 입력해주세요.');
    } else if (content === '' || author.length < 1) {
      return useToast('내용을 입력해주세요.');
    }

    setShowModal(true);
  };

  return (
    <>
      <Topbar centerEl='write' rightEl='write' onButtonClick={confirmUpload} />
      <EditPhraseWrapper>
        <EditPhraseForm>
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
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
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

export default EditPhrase;
