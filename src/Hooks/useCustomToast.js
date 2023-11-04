import { toast } from 'react-toastify';

export const showToast = (message) => {
  return toast(message, {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    autoClose: 2000,
    icon: '🔔',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });
};

export const successToast = (message) => {
  return showToast(message, {
    type: toast.TYPE.SUCCESS,
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    autoClose: 2000,
  });
};
