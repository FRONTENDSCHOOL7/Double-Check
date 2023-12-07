/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContentState } from 'Recoil/ContentState';
import { useRecoilState, useRecoilValue } from 'recoil';
import loginToken from 'Recoil/LoginToken';
import { useGetDetailPhrase, useUpdatePhrase } from 'Hooks/usePhrase';
import { EditPhraseWrapper, EditPhraseForm, EditPhraseInput } from './PhraseEditStyle';
import Button from 'components/Common/Button/Button';
import Modal from 'components/Common/Modal/Modal';
import Textarea from 'components/Common/Textarea/Textarea';
import Topbar from 'components/Common/Topbar/Topbar';
import { useNavigate } from 'react-router-dom';
import { showToast } from 'Hooks/useCustomToast';

const PhraseUpdate = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useRecoilState(ContentState);
  const [showModal, setShowModal] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const token = useRecoilValue(loginToken);
  const navigate = useNavigate();

  // id가 있을 때만 상세페이지 데이터 불러오기
  const { products, loading, error } = useGetDetailPhrase(id);
  const phrase = products ? products.product : null;

  const { updatePhraseMutate } = useUpdatePhrase(id, token);

  useEffect(() => {
    if (phrase) {
      setTitle(phrase.itemName.replace('@cc@', ''));
      setAuthor(phrase.link);
      setContent(phrase.itemImage);
    }

    return () => {
      setContent('');
    };
  }, [id, products, loading, error]);

  const handlePhraseUpdate = async () => {
    updatePhraseMutate({
      itemName: title + '@cc@',
      price: 100,
      link: author,
      itemImage: content,
    });
    showToast('해당 글귀가 수정되었습니다.');
  };

  const confirmUpdate = (e) => {
    e.preventDefault();
    console.log('confirmUpload 함수 실행');

    if (title === '' || title.length < 1) {
      showToast('제목을 입력해주세요.');
      return;
    } else if (author === '' || author.length < 1) {
      showToast('저자를 입력해주세요.');
      return;
    } else if (content === '' || content.length < 1) {
      showToast('내용을 입력해주세요.');
      return;
    }
    setShowModal(true);
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setButtonDisabled(newContent === phrase.itemImage);

    if (newContent !== phrase.itemImage) {
      setShowLeaveConfirm(true);
    } else {
      setShowLeaveConfirm(false);
    }
  };

  useEffect(() => {
    if (phrase) {
      setButtonDisabled(content === phrase.itemImage);
      setHasChanges(content !== phrase.itemImage);
    } else {
      setButtonDisabled(true);
      setHasChanges(false);
    }
  }, [content, phrase]);

  return (
    <>
      <Topbar
        onLeaveClick={() => {
          if (hasChanges) {
            setShowLeaveConfirm(true);
          } else {
            navigate('/phraselist');
          }
        }}
        executeLeaveOnClick
        title='글귀 수정'
        rightButton={
          <Button
            category='basic'
            shape='primary'
            type='button'
            onClick={confirmUpdate}
            disabled={buttonDisabled}
          >
            수정
          </Button>
        }
      />
      <EditPhraseWrapper>
        <EditPhraseForm>
          <Textarea
            value={content}
            onChange={handleContentChange}
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
      <Modal
        content={'글귀를 수정하시겠습니까?'}
        btnTxt='예'
        isVisible={showModal}
        onConfirm={handlePhraseUpdate}
        onCancel={() => setShowModal(false)}
      />
      <Modal
        content={
          <div>
            수정중인 내용이 저장되지 않습니다.
            <br />
            글귀 수정을 종료하시겠습니까?
          </div>
        }
        btnTxt='나가기'
        isVisible={showLeaveConfirm}
        onConfirm={() => {
          setShowLeaveConfirm(false);
          navigate('/phraselist');
        }}
        onCancel={() => setShowLeaveConfirm(false)}
      />
    </>
  );
};

export default PhraseUpdate;
