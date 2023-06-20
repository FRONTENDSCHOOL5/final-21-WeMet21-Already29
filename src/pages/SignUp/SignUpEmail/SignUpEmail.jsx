import { useState } from "react";
import { Link } from "react-router-dom";
import { SignUpContainer, Form, Input, H1, Label } from "./SignUpStyle";
import { GreenBigButton, UnactiveBigButton } from "../../components/Button/Button";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

    const postEmailValid = await fetch(`https://api.mandarin.weniv.co.kr/user/emailvalid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: value,
        },
      }),
    });

    const json = await postEmailValid.json();
    console.log(json.message);

    const Msg = json.message;
    setEmailError(Msg);
    Msg === "사용 가능한 이메일 입니다." ? setEmailValid(true) : setEmailValid(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password && emailValid && passwordValid) {
    }
  };

  return (
    <>
      <SignUpContainer>
        <H1>이메일로 회원가입</H1>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor='user-email'>이메일</Label>
          <Input id={"user-email"} type={"email"} label={"이메일"} placeholder={"이메일 주소를 입력해 주세요."} value={email} valid={emailValid} alertMsg={setEmailError} onChange={handleEmailInput} onBlur={handleEmailValid} />
          {emailError && <p style={{ marginBottom: "2rem", marginTop: "-2.4rem", fontSize: "1.2rem", color: "var(--font-red-color)" }}>{emailError}</p>}
          <Label htmlFor='user-password'>비밀번호</Label>
          <Input id={"user-password"} type={"password"} label={"비밀번호"} placeholder={"비밀번호를 설정해 주세요."} value={password} valid={passwordValid} alertMsg={setPasswordError} onChange={handlePasswordInput} />
          {passwordError && <p style={{ marginBottom: "3rem", marginTop: "-2.4rem", fontSize: "1.2rem", color: "var(--font-red-color)" }}>{passwordError}</p>}
          <Link to={"/ProfileSetting"} state={{ test: 1 }}>{email && password ? <GreenBigButton type='submit' contents={"다음"} /> : <UnactiveBigButton type='submit' contents={"다음"} />} </Link>
        </Form>
      </SignUpContainer>
    </>
  );
}
