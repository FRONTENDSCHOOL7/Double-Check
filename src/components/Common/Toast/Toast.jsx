/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import showToast from '../../../Hooks/showToast';

function Toast({ message, add }) {
  const handleShowToast = () => {
    showToast(message, add ? 'success' : 'error');
  };

  return (
    <div>
      <button onClick={handleShowToast}>Show Toast</button>
    </div>
  );
}

export default Toast;
