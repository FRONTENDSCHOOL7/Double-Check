import React, { useState } from 'react';
import { EditPhraseWrapper, EditPhraseForm, EditPhraseInput } from './EditPhraseStyle';
import Textarea from 'components/Common/Textarea/Textarea';

function EditPhrase() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  console.log('title: ' + title);

  return (
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
        <Textarea placeholder='내용을 입력해주세요.' />
      </EditPhraseForm>
    </EditPhraseWrapper>
  );
}

export default EditPhrase;
