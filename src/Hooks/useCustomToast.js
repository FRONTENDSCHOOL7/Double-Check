import { toast } from 'react-toastify';

const useCustomToast = () => {
  const showToast = (message) => {
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

  return showToast;
};

export default useCustomToast;
