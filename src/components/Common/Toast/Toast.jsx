/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import useToast from '../../../Hooks/useToast';

function Toast(props) {
  const handleShowToast = (success) => {
    if (success) {
      useToast(`${props.message}`, 'success');
    } else {
      useToast(`${props.message}`, 'error');
    }
  };

  return (
    <div>
      <button onClick={() => handleShowToast(props.add)}>Show Toast</button>
    </div>
  );
}

export default Toast;
