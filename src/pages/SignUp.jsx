import React, { useRef } from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 390px;
  height: 100vh;
  font-size: 14px;
  margin: 0 auto;
  color: var(--font-black-color);
`;

const SignUpTitle = styled.h2`
  font-weight: 600;
  font-size: 1.5rem;
  margin: 3.0625rem 0 2.5rem;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20.125rem;
  font-size: 0.75rem;
`;

const StyleInput = styled.input`
  border: none;
  outline: none;
  border-bottom: 2px solid var(--line-gray-color);
  padding: 5px 0;
  font-size: 0.875rem;
  margin: 10px 0 16px;

  &:focus {
    border-color: var(--main-color);
  }

  &::placeholder {
    font-size: 0.875rem;
    color: var(--line-gray-color);
  }
`;

const StyleLabel = styled.label`
  text-align: left;
  font-size: 0.75rem;
  color: var(--font-gray-color);
`;

const SignUpButton = styled.button`
  background: var(--main-color);
  color: var(--white-color);
  border-radius: 10px;
  width: 20.125rem;
  height: 2.75rem;
  font-size: 0.875rem;
  text-align: center;
  border: none;
  cursor: pointer;
  margin: 1rem auto;
`;

const ErrorMessage = styled.div`
  color: var(--font-red-color);
  font-size: 0.75rem;
  font-weight: 37.5rem;
  margin-top: -0.375rem;
`;

export default function SignUp() {
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
      button.current.style.backgroundColor = "#058B2E";
      button.current.disabled = false;
    } else {
      button.current.style.backgroundColor = " rgba(5, 139, 46, 0.4)";
      button.current.disabled = true;
    }
  }, [userEmail, userPassword]);

  // 이메일 중복 검사
  const [emailExists, setEmailExists] = useState(false); // 가입된 이메일이 존재하는지 여부를 나타내는 상태 변수 추가

  const checkEmailExists = (email) => {
    // 이미 가입된 이메일을 확인하는 비동기 함수
    return new Promise((resolve) => {
      setTimeout(() => {
        const exists = email === "yonaisgood@gmail.com";
        resolve(exists);
      }, 1000);
    });
  };

  // 비밀번호 유효성 검사
  const [passwordError, setPasswordError] = useState(""); // 에러 메시지 상태 변수 추가

  const submitHandler = async (e) => {
    e.preventDefault();
    // 이메일이 이미 가입된 경우 경고 메시지를 표시하고 반환
    if (emailExists) {
      setPasswordError("이미 가입된 이메일입니다.");
      return;
    }

    // 비밀번호의 유효성을 검사
    if (userPassword.length < 6) {
      setPasswordError("비밀번호는 6자리 이상이어야 합니다.");
      return;
    }
    // 이미 가입된 이메일을 확인
    const exists = await checkEmailExists(userEmail);
    setEmailExists(exists);

    // 가입된 이메일이 있는 경우 경고 메시지를 표시하고 반환
    if (exists) {
      setPasswordError("이미 가입된 이메일입니다.");
      return;
    }

    // 가입 처리하는 로직
    fetch("https://api.mandarin.weniv.co.kr/user/user", {
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
        if (json.error) {
          // 에러 메시지가 있는 경우 상태 변수를 업데이트하여 에러 메시지 표시
          setPasswordError(json.message);
        } else {
          // 에러가 없는 경우 처리 로직
          button.current.parentNode.querySelector("p").textContent = json.message;
          console.log(json.user.token);
          localStorage.setItem("token", json.user.token);
        }
      });
  };

  return (
    <>
      <SignUpContainer>
        <SignUpTitle>이메일로 회원가입</SignUpTitle>
        <SignUpForm onSubmit={submitHandler}>
          <StyleLabel htmlFor='user-email'>이메일</StyleLabel>
          <StyleInput type='email' id='user-email' onChange={inputHandler} value={userEmail} placeholder='이메일주소를 입력해주세요' />
          <StyleLabel htmlFor='user-password'>비밀번호</StyleLabel>
          <StyleInput type='password' id='user-password' onChange={inputHandler} value={userPassword} placeholder='비밀번호를 입력해주세요' error={passwordError} />
          <p></p>
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          <SignUpButton type='submit' ref={button}>
            다음
          </SignUpButton>
        </SignUpForm>
      </SignUpContainer>
    </>
  );
}
