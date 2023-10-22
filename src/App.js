/* eslint-disable react/react-in-jsx-scope */
import axios from "axios";
import LoginPage from "./Components/Login";
import SignUpPage from "./Components/SignUp";
import { infoState, pageState } from "./atoms/user";
import { useRecoilState } from "recoil";

function App() {
  const [page, setPage] = useRecoilState(pageState);
  const [info, setInfo] = useRecoilState(infoState);
  const handlePage = () => {
    setPage((prevPage) => {
      return !prevPage;
    });
  };
  const getMyinfo = async () => {
    const token = localStorage.getItem("token");
    const reqUrl = "https://api.mandarin.weniv.co.kr/user/myinfo";
    try {
      const res = await axios.get(reqUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      setInfo(JSON.stringify(res));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button type="button" onClick={getMyinfo}>
        내 정보 불러오기
      </button>
      {info}
      {page ? (
        <LoginPage handlePage={handlePage} />
      ) : (
        <SignUpPage handlePage={handlePage} />
      )}
    </div>
  );
}
export default App;
