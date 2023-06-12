import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Loginh1 = styled.h1`
  margin-top: 54px;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 40px;
  font-weight: bold;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 3.4rem;
  color: #767676;
`;

const StyleInput = styled.input`
  margin: 10px 0 16px;
  border: none;
  outline: none;
  border-bottom: 1px solid #ccc;
  padding: 0 0;
  font-size: 1.3rem;

  &:focus {
    border-color: var(--main-color);
  }
`;

const LoginButton = styled.button`
  border-radius: 30px;
  color: #fff;
  padding: 20px 0;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  height: 44px;
  margin-top: 20px;
  padding: 15px;
`;

const NavStyle = styled(NavLink)`
  display: block;
  list-style: none;
  text-align: center;
  margin-top: 20px;
  color: #767676;
  text-decoration: none;
  font-size: 0.8rem;
`;

const Label = styled.label`
  font-size: 0.8rem;
`;

const FormBox = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 428px;
  height: 926px;
`;

export default function Login() {
  // https://api.mandarin.weniv.co.kr/

  const [userEmail, setUserEmail] = useState(""),
    [userPassword, setUserPassword] = useState("");
  const button = useRef(null);

  const inputHandler = (e) => {
    if (e.target.type === "email") {
      setUserEmail(e.target.value);
    }
    if (e.target.type === "password") {
      setUserPassword(e.target.value);
    }
  };

  useEffect(() => {
    if (userEmail && userPassword) {
      button.current.style.backgroundColor = "#058b2e";
      button.current.disabled = false;
      console.log(button.current.disabled);
    } else {
      button.current.style.backgroundColor = "rgb(5, 139, 46, 0.5)";
      button.current.disabled = true;
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
        button.current.parentNode.querySelector("p").textContent = json.message;

        // console.log(json.user.token);
        // localStorage.setItem("token", json.user.token);
        if (json.user) {
          console.log(json);
          localStorage.setItem("token", json.user.token);
        }
      });
  };

  return (
    <>
      <></>
      <FormBox>
        <Loginh1>로그인</Loginh1>
        <LoginForm onSubmit={submitHandler}>
          <Label htmlFor="user-email">이메일</Label>
          <StyleInput type="email" id="user-email" onChange={inputHandler} value={userEmail} />
          <Label htmlFor="user-password">비밀번호</Label>
          <StyleInput type="password" id="user-password" onChange={inputHandler} value={userPassword} />
          <p style={{ color: "red", fontSize: "0.7rem" }}></p>
          <LoginButton type="submit" ref={button}>
            로그인
          </LoginButton>
        </LoginForm>
        <NavStyle>이메일로 회원가입하기</NavStyle>
      </FormBox>
    </>
  );
}
