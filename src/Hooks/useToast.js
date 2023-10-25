import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function useToast(message) {
  const config = {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: false,
    draggable: false,
    pasueOnHove: false,
  };

  return toast(message, config);
}

export default useToast;
