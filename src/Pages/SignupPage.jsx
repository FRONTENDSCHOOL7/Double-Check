/* eslint-disable no-empty */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { accountnameValid, signUpAPI } from "API/User";
import { emailValid } from "API/User";
import axios from "axios";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState([]);
  const [userErrorMessage, setUserErrorMessage] = useState([]); // "errorMessage"를 제거하고 "userErrorMessage"로 변경
  const [checkPassword, setCheckPassword] = useState("");
  const [emailDuplicate, setEmailDuplicate] = useState(true);
  const [accountnameDuplicate, setAccountnameDuplicate] = useState(true);
  const [signUpData, setSignUpData] = useState({
    user: {
      username: "",
      email: "",
      password: "",
      accountname: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
    // setCheckEmail((prevState) => ({
    //   ...prevState,
    //   user: {
    //     ...prevState.user,
    //     email: signUpData.user.email,
    //   },
    // }));
  };

  // const emailAvailable = async () => {
  //   try {
  //     const checkEmail = {
  //       user: {
  //         email: signUpData.user.email,
  //       },
  //     };
  //     const response = await emailValid(checkEmail);

  //     if (response.status === 200) {
  //       // API 요청이 성공한 경우의 처리
  //       console.log("Email is valid");
  //     } else {
  //       // API 요청은 성공했지만 응답이 다른 상태 코드를 가지는 경우의 처리
  //       console.log("Email is not valid");
  //     }
  //   } catch (error) {
  //     // API 요청이 실패한 경우의 처리
  //     console.error("API 요청 중 오류 발생:", error);

  //     // 에러 메시지를 사용자에게 알림
  //     // 예를 들어, 모달 팝업 또는 오류 메시지를 표시할 수 있습니다.
  //   }
  // };

  const emailAvailable = async () => {
    const reqUrl = "https://api.mandarin.weniv.co.kr/user/emailvalid";
    const data = {
      user: {
        email: signUpData.user.email,
      },
    };
    try {
      const response = await axios.post(reqUrl, data, {
        headers: {
          "Content-type": "application/json",
        },
      });
      const message = response.data.message;
      if (message === "사용 가능한 이메일 입니다.") {
        setEmailDuplicate(false);
      } else {
        setEmailDuplicate(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const accountnameAvailable = async () => {
    const reqUrl = "https://api.mandarin.weniv.co.kr/user/accountnamevalid";
    const data = {
      user: {
        email: signUpData.user.accountname,
      },
    };
    try {
      const response = await axios.post(reqUrl, data, {
        headers: {
          "Content-type": "application/json",
        },
      });
      const message = response.data.message;
      if (message === "사용 가능한 계정ID 입니다.") {
        setAccountnameDuplicate(false);
      } else {
        setAccountnameDuplicate(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleError = async () => {
    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const passwordLength = signUpData.user.password.length;
    const email = signUpData.user.email;
    const username = signUpData.user.username;
    const accountname = signUpData.user.accountname;
    const errors = [];
    await emailAvailable();
    await accountnameAvailable();

    if (email === "") {
      errors.push("유효한 이메일을 입력해주세요.");
    } else if (!emailRegex.test(email)) {
      errors.push("이메일 형식이 올바르지 않습니다.");
    } else if (emailDuplicate) {
      errors.push("이미 가입된 이메일 입니다.");
    } else if (passwordLength < 6) {
      errors.push("비밀번호를 6자리 이상 입력해주세요");
    } else if (signUpData.user.password !== checkPassword) {
      errors.push("비밀번호가 일치하지 않습니다.");
    } else if (username === "") {
      errors.push("사용자 이름을 입력해 주세요");
    } else if (accountname === "") {
      errors.push("계정ID를 입력해 주세요.");
    } else if (accountnameDuplicate) {
      errors.push("중복된 계정ID 입니다.");
    } else {
      errors.push("");
      handleSubmitBtn();
    }
    setUserErrorMessage(errors);
  };

  const handleSubmitBtn = async () => {
    console.log(signUpData); // api data 확인
    const response = await signUpAPI(signUpData);
    if (response && response.hasOwnProperty("user")) navigate("/");
    else {
      const errorMessage =
        response && response.message ? response.message : handleError();
      setErrorMessage(errorMessage);
    }
  };

  return (
    <>
      <section>
        <h2>이메일로 회원가입</h2>
        <InputDiv>
          <Label htmlFor="emailInput">이메일</Label>
          <InputBox
            type="email"
            id="emailInput"
            name="email"
            placeholder="이메일 주소를 알려주세요."
            onChange={handleInputChange}
            value={signUpData.user.email}
          />
          {userErrorMessage.includes("유효한 이메일을 입력해주세요") && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
          {userErrorMessage.includes("이메일 형식이 올바르지 않습니다.") && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
          {userErrorMessage.includes("이미 가입된 이메일 입니다.") && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
        </InputDiv>
        <InputDiv>
          <Label htmlFor="passwordInput">비밀번호</Label>
          <InputBox
            type="password"
            name="password"
            id="passwordInput"
            placeholder="비밀번호를 설정해 주세요."
            onChange={handleInputChange}
            value={signUpData.user.password}
          />
          {userErrorMessage.includes("비밀번호를 6자리 이상 입력해주세요") && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
        </InputDiv>
        <InputDiv>
          <Label htmlFor="passwordInput">비밀번호 확인</Label>
          <InputBox
            type="password"
            name="checkPassword"
            id="checkPassword"
            placeholder="동일한 비밀번호를 입력해주세요."
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
          {userErrorMessage.includes("비밀번호가 일치하지 않습니다.") && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
        </InputDiv>
      </section>

      <section>
        <InputDiv>
          <Label htmlFor="userNameInput">사용자 이름</Label>
          <InputBox
            type="text"
            id="userNameInput"
            name="username"
            placeholder="2~10자 이내여야 합니다."
            onChange={handleInputChange}
            value={signUpData.user.username}
          />
          {userErrorMessage.includes("사용자 이름을 입력해 주세요") && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
        </InputDiv>
        <InputDiv>
          <Label htmlFor="userIdInput">계정 ID</Label>
          <InputBox
            type="text"
            id="userIdInput"
            name="accountname"
            placeholder="영문, 숫자, 특수문자(,), (_)만 사용 가능합니다."
            onChange={handleInputChange}
            value={signUpData.user.accountname}
          />
          {userErrorMessage.includes("계정ID를 입력해 주세요.") && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
          {userErrorMessage.includes("중복된 계정ID 입니다.") && (
            <ErrorMassage>{userErrorMessage}</ErrorMassage>
          )}
        </InputDiv>
        <ButtonDiv>
          <Button type="button" onClick={handleError}>
            가입하기
          </Button>
        </ButtonDiv>
      </section>
    </>
  );
}

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

const H1 = styled.h1`
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
`;

const H2 = styled.div`
  img {
    height: 76px;
  }
`;

const Label = styled.label`
  font-family: var(--font--Bold);
  margin-bottom: 9px;
  font-weight: 700;
`;

const ButtonDiv = styled.div`
  margin-top: 166px;
`;

const ErrorMassage = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 14px;
`;

const Button = styled.button`
  width: 200px;
  border: 1px solid black;
`;

const InputBox = styled.input`
  width: 300px;
`;
