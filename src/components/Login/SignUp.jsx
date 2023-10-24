/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
// import { useState } from "react";
// import axios from "axios";
// import { useState } from "react";

// export default function SignUpPage({ handlePage }) {
//   const [errorMessage, setErrorMessage] = useState([]);
//   const [userErrorMessage, setUserErrorMessage] = useState([]);
//   const [checkPassword, setCheckPassword] = useState("");

//   const [signUpData, setSignUpData] = useState({
//     user: {
//       email: "",
//       password: "",
//       accountname: "",
//       username: "",
//     },
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSignUpData((prevState) => ({
//       ...prevState,
//       user: {
//         ...prevState.user,
//         [name]: value,
//       },
//     }));
//   };

//   const handleError = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const email = signUpData.user.email;
//     const password = signUpData.user.password.length;

//     const errors = [];
//     if (email === "") {
//       errors.push("유효한 이메일을 입력해주세요");
//     } else if (!emailRegex.test(email)) {
//       // test() : 정규표현식에 만족하는지 판별(true, false)
//       errors.push("이메일 형식이 올바르지 않습니다.");
//     } else if (password < 6) {
//       errors.push("비밀번홀르 6자리 이상 입력해 주세요");
//     } else if (password !== checkPassword) {
//       errors.push("비밀번호가 일치하지 않습니다.");
//     } else {
//       errors.push("");
//     }
//     setUserErrorMessage(errors);
//   };

//   return (
//     <>
//       <button type="button" onClick={handlePage}>
//         로그인페이지로 돌아가기
//       </button>
//       <section>
//         <h2>이메일로 회원가입</h2>
//         <div>
//           <label htmlFor="emailInput">이메일</label>
//           <input
//             type="email"
//             id="emailInput"
//             name="email"
//             placeholder="이메일 주소를 알려주세요."
//             onChange={handleInputChange}
//             value={signUpData.user.email}
//           />
//           {/* 이메일을 입력하지 않은 경우 */}
//           {userErrorMessage.includes("이메일을 입력해 주세요.") && (
//             <p>{userErrorMessage}</p>
//           )}
//         </div>
//         <div>
//           <label htmlFor="passwordInput">비밀번호</label>
//           <input
//             type="password"
//             name="password"
//             id="passwordInput"
//             placeholder="비밀번호를 설정해 주세요."
//             onChange={handleInputChange}
//             value={signUpData.user.password}
//           />
//           {/* 비밀번호 6자 미만인 경우 */}
//           {userErrorMessage.includes("비밀번호를 6자리 이상 입력해주세요") && (
//             <p>{userErrorMessage}</p>
//           )}
//         </div>
//         <div>
//           <label htmlFor="passwordInput">비밀번호 확인</label>
//           <input
//             type="password"
//             name="chekPassword"
//             id="checkPassword"
//             placeholder="동일한 비밀번호를 입력해주세요. "
//             onChange={setCheckPassword}
//             value={checkPassword}
//           />
//         </div>
//         {/* 비밀번호 6자 미만인 경우 */}
//         {userErrorMessage.includes("비밀번호가 일치하지 않습니다.") && (
//           <p>{userErrorMessage}</p>
//         )}
//       </section>

//       <section>
//         <form onSubmit={handleError}>
//           <div>
//             <label htmlFor="userNameInput">사용자 이름</label>
//             <input
//               type="text"
//               id="userNameInput"
//               name="username"
//               placeholder="2~10자 이내여야 합니다."
//               onChange={handleInputChange}
//               value={signUpData.user.username}
//             />
//           </div>
//           <div>
//             <label htmlFor="userIdInput">계정 ID</label>
//             <input
//               type="text"
//               id="userIdInput"
//               name="accountname"
//               placeholder="영문, 숫자, 특수문자(,), (_)만 사용 가능합니다."
//               onChange={handleInputChange}
//               value={signUpData.user.accountname}
//             />
//           </div>
//           <button>감귤마켓 시작하기</button>
//         </form>
//       </section>
//     </>
//   );
// }
