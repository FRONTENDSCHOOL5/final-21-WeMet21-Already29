import React, { useState, useRef, useEffect } from "react";
import { Loginh1, LoginForm, StyleInput, NavStyle, Label, FormBox } from "./LoginStyle";
import { useNavigate } from "react-router-dom"; // eslint-disable-line no-unused-vars
import BtnStyle from "../../components/Button/Button";

export default function Login() {
  // https://api.mandarin.weniv.co.kr/

  const [userEmail, setUserEmail] = useState(""),
    [userPassword, setUserPassword] = useState("");
  const button = useRef(null);
  const [warningMessage, setWarningMessage] = useState(""); // 경고문구도 state, 바뀌는 부분!!

  const navigate = useNavigate();

  const inputHandler = (e) => {
    if (e.target.type === "email") {
      setUserEmail(e.target.value);
      if (validateEmail(e.target.value)) {
        setWarningMessage("");
      } else {
        setWarningMessage("올바른 이메일 형식이 아닙니다.");
      }
    }
    if (e.target.type === "password") {
      setUserPassword(e.target.value);
      if (e.target.value.length < 6) {
        setWarningMessage("비밀번호는 6자리 이상이어야 합니다.");
      } else {
        setWarningMessage("");
      }
    }
  };

  const validateEmail = (email) => {
    return true;
  };

  useEffect(() => {
    if (button.current) {
      if (userEmail && userPassword) {
        button.current.style.backgroundColor = "#058b2e";
        button.current.disabled = false;
        console.log(button.current.disabled);
      } else {
        button.current.style.background = "red"; // 에러
        button.current.disabled = true;
      }
    }
  }, [userEmail, userPassword, warningMessage]);

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
        // setWarningMessage(json.message);
        setWarningMessage(json.message);

        // console.log(json.user.token);
        // localStorage.setItem("token", json.user.token);
        if (json.user) {
          console.log(json);
          localStorage.setItem("token", json.user.token);
          localStorage.setItem("username", json.user.username);
          // 페이지 이동!!
          navigate("/home");
        } else {
          setWarningMessage("이메일과 비밀번호가 일치하지 않습니다.");
        }
      })
      .catch((error) => console.log(error));
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
          <p style={{ color: "red", fontSize: "0.7rem", marginBottom: "0.938rem" }}>{warningMessage}</p>

          {userEmail && userPassword ? (
            <BtnStyle type="submit" colorType={true} disabled={!(userEmail && userPassword && !warningMessage)}>
              로그인
            </BtnStyle>
          ) : (
            <BtnStyle type="submit">로그인</BtnStyle>
          )}
        </LoginForm>
        <NavStyle to={"/signup"}>이메일로 회원가입하기</NavStyle>
      </FormBox>
    </>
  );
}
