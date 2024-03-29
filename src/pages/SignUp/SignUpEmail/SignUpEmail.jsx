import { useEffect, useState } from "react";

import useDebounce from "../../../hooks/useDebounce";

import Button from "../../../components/Button/Button";
import UserInput from "../../../components/UserInput/UserInput";

import fetchApi from "../../../utils/fetchApi";

import { SignUpContainer, SignUpForm, H2 } from "./SignUpEmail.style";

export default function SignUpEmail({ setPage, email, setEmail, password, setPassword }) {
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const { output: emailValidResult, setKeyword: setEmailKeyword } = useDebounce(
    "user/emailvalid",
    JSON.stringify({
      user: {
        email: email,
      },
    })
  );

  useEffect(() => {
    setEmailKeyword(email);

    switch (emailValidResult.message) {
      case "사용 가능한 이메일 입니다.":
        setEmailError("");
        setEmailValid(true);
        break;
      default:
        setEmailError(emailValidResult.message);
        setEmailValid(false);
        break;
    }
  }, [email, setEmailKeyword, emailValidResult]);

  //이메일 주소 기입
  const handleInput = (e) => {
    switch (e.target.type) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        if (e.target.value.length >= 6) {
          setPasswordError("");
          setPasswordValid(true);
        } else {
          setPasswordError("비밀번호는 6자 이상이어야 합니다.");
          setPasswordValid(false);
        }
        break;
      default:
        break;
    }
  };

  // 이메일, 비밀번호가 통과되어 유효할 시
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailValid && passwordValid) {
      try {
        const json = await fetchApi(
          "user/register",
          "POST",
          JSON.stringify({
            user: {
              email,
              password,
            },
          })
        );

        if (json.message === "회원가입이 성공했습니다.") {
          setPage("SignUpProfile");
        } else {
          setError("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        setError("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
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
        <H2>이메일로 회원가입</H2>
        <SignUpForm onSubmit={handleSubmit}>
          <UserInput id={"user-email"} type={"email"} label={"이메일"} placeholder={"이메일 주소를 입력해 주세요."} value={email} onChange={handleInput}>
            이메일
          </UserInput>
          {emailError && (
            <p
              style={{
                color: "red",
                fontSize: "1.1rem",
                margin: " -1rem 0 1.5rem",
              }}
            >
              {emailError}
            </p>
          )}
          <UserInput id={"user-password"} type={"password"} placeholder={"비밀번호를 설정해 주세요."} value={password} onChange={handleInput}>
            비밀번호
          </UserInput>
          {passwordError && (
            <p
              style={{
                color: "red",
                fontSize: "1.1rem",
                margin: " -1rem 0 1.5rem",
              }}
            >
              {passwordError}
            </p>
          )}
          {emailValid && passwordValid ? (
            <Button category="basic" type="submit" onClick={handleForm} style={{ marginTop: "30px" }}>
              다음
            </Button>
          ) : (
            <Button category="basic" type="submit" disabled="disabled" onClick={handleForm} style={{ marginTop: "30px" }}>
              다음
            </Button>
          )}
        </SignUpForm>
      </SignUpContainer>
    </>
  );
}
