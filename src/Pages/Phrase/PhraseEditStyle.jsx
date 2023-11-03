import styled from 'styled-components';

const EditPhraseWrapper = styled.section`
  border-radius: 12px;
  height: 100%;
`;

const EditPhraseForm = styled.form`
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: inherit;
`;

const EditPhraseInput = styled.input`
  padding: 14px 10px;
  font-size: var(--font-sm-size);
  &:not(:last-of-type) {
    border-bottom: 1px solid var(--gray-300);
  }
`;

export { EditPhraseWrapper, EditPhraseForm, EditPhraseInput };
