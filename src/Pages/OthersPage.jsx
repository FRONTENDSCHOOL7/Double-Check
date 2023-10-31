import React from 'react';
import { useParams } from 'react-router-dom';
export default function OthersPage() {
  const { accountname } = useParams();

  console.log(accountname);
  return <div> OthersPage</div>;
}
