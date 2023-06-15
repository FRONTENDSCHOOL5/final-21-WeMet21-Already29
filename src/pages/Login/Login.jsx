import React, { useState, useRef, useEffect } from "react";
import { Loginh1, LoginForm, StyleInput, NavStyle, Label, FormBox } from "./LoginStyle";
import { useNavigate } from "react-router-dom"; // eslint-disable-line no-unused-vars
import { GreenBigButton } from "../../components/Button/Button";

export default function Login({ props }) {
  // https://api.mandarin.weniv.co.kr/

  const [userEmail, setUserEmail] = useState(""),
    [userPassword, setUserPassword] = useState("");
  const button = useRef(null);
  const [warningMessage, setWarningMessage] = useState("");

  // useNavigate

  const navigate = useNavigate();

  const inputHandler = (e) => {
    if (e.target.type === "email") {
      setUserEmail(e.target.value);
    }
    if (e.target.type === "password") {
      setUserPassword(e.target.value);
    }
  };

  useEffect(() => {
    if (button.current) {
      if (userEmail && userPassword) {
        button.current.style.backgroundColor = "#058b2e";
        button.current.disabled = false;
        console.log(button.current.disabled);
      } else {
        button.current.style.backgroundColor = "rgb(5, 139, 46, 0.5)";
        button.current.disabled = true;
      }
    }
  }, [userEmail, userPassword]);

  const submitHandler = (e) => {
    e.preventDefault();
    fetch("https://api.mandarin.weniv.co.kr/user/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },

      body: JSON.stringify({
        user: {
          email: userEmail,
          password: userPassword,
        },
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        // button.current.parentNode.querySelector("p").textContent = json.message;
        setWarningMessage(json.message);

        // console.log(json.user.token);
        // localStorage.setItem("token", json.user.token);
        if (json.user) {
          console.log(json);
          localStorage.setItem("token", json.user.token);
          navigate("./homefeed");
        }
      });
  };

  return (
    <>
      <FormBox>
        <Loginh1>로그인</Loginh1>
        <LoginForm onSubmit={submitHandler}>
          <Label htmlFor="user-email">이메일</Label>
          <StyleInput type="email" id="user-email" onChange={inputHandler} value={userEmail} />
          <Label htmlFor="user-password">비밀번호</Label>
          <StyleInput type="password" id="user-password" onChange={inputHandler} value={userPassword} />
          <p style={{ color: "red", fontSize: "0.7rem" }}>{warningMessage}</p>
          <GreenBigButton type="submit" colorType={true} contents="로그인" disabled={!(userEmail && userPassword)}></GreenBigButton>
        </LoginForm>
        <NavStyle>이메일로 회원가입하기</NavStyle>
      </FormBox>
    </>
  );
}
