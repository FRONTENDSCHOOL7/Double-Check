import styled from 'styled-components';

const EditPhraseWrapper = styled.section`
  border-radius: 12px;
`;

const EditPhraseForm = styled.form`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const EditPhraseInput = styled.input`
  padding: 14px 10px;
  font-size: var(--font-sm-size);
  border-bottom: 1px solid var(--gray-200);
`;

export { EditPhraseWrapper, EditPhraseForm, EditPhraseInput };
