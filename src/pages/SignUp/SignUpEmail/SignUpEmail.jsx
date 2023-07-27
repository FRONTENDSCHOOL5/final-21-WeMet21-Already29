import { useState } from "react";
import { SignUpContainer, Form, H1 } from "./SignUpEmailStyle";
import Button from "../../../components/Button/Button";
import UserInput from "../../../components/UserInput/UserInput";

export default function SignUpEmail({
  setPage,
  email,
  setEmail,
  password,
  setPassword,
}) {
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //이메일 주소 기입
  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  // 비밀번호 유효성 검사
  const handlePasswordInput = (event) => {
    const value = event.target.value;
    setPassword(value);
    if (value.length >= 6) {
      setPasswordError("");
      setPasswordValid(true);
    } else {
      setPasswordError("비밀번호는 6자 이상이어야 합니다.");
      setPasswordValid(false);
    }
  };

  // 이메일 유효성 검사
  const handleEmailValid = async (event) => {
    const value = event.target.value;

    const postEmailValid = await fetch(
      `https://api.mandarin.weniv.co.kr/user/emailvalid`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: value,
          },
        }),
      }
    );

    const json = await postEmailValid.json();

    if (json.message === "사용 가능한 이메일 입니다.") {
      setEmailError("");
      setEmailValid(true);
    } else {
      setEmailError(json.message);
      setEmailValid(false);
    }
  };

  // 이메일, 비밀번호가 통과되어 유효할 시
  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailValid && passwordValid) {
    }
  };

  // 기존페이지에서 넘어가도록 지정
  const handleForm = (e) => {
    e.preventDefault();
    setPage("SignUpProfile");
  };

  return (
    <>
      <SignUpContainer>
        <H1>이메일로 회원가입</H1>
        <Form onSubmit={handleSubmit}>
          <UserInput
            id={"user-email"}
            type={"email"}
            label={"이메일"}
            placeholder={"이메일 주소를 입력해 주세요."}
            value={email}
            onChange={handleEmailInput}
            onBlur={handleEmailValid}
          >
            이메일
          </UserInput>
          {emailError && (
            <p
              style={{
                marginTop: "-0.8rem",
                marginBottom: "1rem",
                fontSize: "1.2rem",
                color: "var(--font-red-color)",
              }}
            >
              {emailError}
            </p>
          )}
          <UserInput
            id={"user-password"}
            type={"password"}
            label={"비밀번호"}
            placeholder={"비밀번호를 설정해 주세요."}
            value={password}
            onChange={handlePasswordInput}
          >
            비밀번호
          </UserInput>
          {passwordError && (
            <p
              style={{
                marginTop: "-1rem",
                fontSize: "1.2rem",
                color: "var(--font-red-color)",
              }}
            >
              {passwordError}
            </p>
          )}
        </Form>
        {emailValid && passwordValid ? (
          <Button category="basic" type="submit" onClick={handleForm}>
            다음
          </Button>
        ) : (
          <Button
            category="basic"
            type="submit"
            disabled="disabled"
            onClick={handleForm}
          >
            다음
          </Button>
        )}
      </SignUpContainer>
    </>
  );
}
