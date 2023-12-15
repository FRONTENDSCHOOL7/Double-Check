import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
const ManuTab = () => {
  return (
    <section>
      <ManuList>
        <li>
          <SMaunTabs to='/#' aria-label='읽은 책'>
            <SMaunTabBox></SMaunTabBox>
          </SMaunTabs>
        </li>
        <li>
          <SMaunTabs to='/#' aria-label='읽을 책'>
            <SMaunTabBox></SMaunTabBox>
          </SMaunTabs>
        </li>
        <li>
          <SMaunTabs to='/#' aria-label='저장한 책'>
            <SMaunTabBox></SMaunTabBox>
          </SMaunTabs>
        </li>
      </ManuList>
    </section>
  );
};
const ManuList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0px 10px;

  justify-items: center;
`;
const SMaunTabBox = styled.div`
  width: 110px;
  height: 110px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10px;
`;
const SMaunTabs = styled(Link)``;
export default ManuTab;
