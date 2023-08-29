import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import UserInput from "../../components/UserInput/UserInput";
import UserInfo from "../../contexts/LoginContext";

import fetchApi from "../../utils/fetchApi";

import { H2, LoginContainer, LoginForm, NavStyle, WarningMessage } from "./Login.style";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [emailWarining, setEmailWarining] = useState("");
  const [passwordWarining, setPasswordWarining] = useState("");

  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserInfo);

  const inputHandler = (e) => {
    if (e.target.type === "email") {
      setUserEmail(e.target.value);
      if (validateEmail(e.target.value)) {
        setEmailWarining("");
      } else {
        setEmailWarining("올바른 이메일 형식이 아닙니다.");
      }
      setWarningMessage("");
    }
    if (e.target.type === "password") {
      setUserPassword(e.target.value);
      if (e.target.value.length < 6) {
        setPasswordWarining("비밀번호는 6자리 이상이어야 합니다.");
      } else {
        setPasswordWarining("");
      }
      setWarningMessage("");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const json = await fetchApi(
        "user/login",
        "POST",
        JSON.stringify({
          user: {
            email: userEmail,
            password: userPassword,
          },
        })
      );

      if (json.user) {
        setUserInfo(json.user);
        localStorage.setItem("userInfo", JSON.stringify(json.user));
        localStorage.setItem("token", json.user.token);
        navigate("/home");
      } else {
        setWarningMessage("이메일과 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LoginContainer>
        <H2>로그인</H2>
        <LoginForm onSubmit={submitHandler}>
          <UserInput type="email" id="user-email" onChange={inputHandler} value={userEmail}>
            이메일
          </UserInput>
          {emailWarining && <WarningMessage>{emailWarining}</WarningMessage>}
          <UserInput type="password" id="user-password" onChange={inputHandler} value={userPassword}>
            비밀번호
          </UserInput>
          {passwordWarining && <WarningMessage>{passwordWarining}</WarningMessage>}
          <WarningMessage alignCenter={true}>{warningMessage}</WarningMessage>
          <Button category="basic" type="submit" disabled={!(userEmail && userPassword && !emailWarining && !passwordWarining)}>
            로그인
          </Button>
        </LoginForm>
        <NavStyle to={"/signup"}>이메일로 회원가입하기</NavStyle>
      </LoginContainer>
    </>
  );
}
