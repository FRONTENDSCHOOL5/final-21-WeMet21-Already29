import React from "react";

import { EmailLoginLink, EmailSignUpLink, StyledIntroLoginPage } from "./Intro.style";

import charaterLogo from "../../assets/images/mascot.png";

function Intro() {
  return (
    <StyledIntroLoginPage>
      <header>
        <h2 className="title">입9팔9</h2>
        <p className="sub-title">
          <span>데일리룩과 취향을 공유하며</span>
          <span>지속가능한 패션을 함께 만들어가는 공간</span>
        </p>
      </header>
      <img src={charaterLogo} alt="입구팔구 마스코트 캐릭터 사진" />
      <EmailLoginLink to="login">이메일로 로그인</EmailLoginLink>
      <p className="signup-text">
        <span>처음오셨나요?</span>
        <EmailSignUpLink to="signup">이메일로 가입하기</EmailSignUpLink>
      </p>
    </StyledIntroLoginPage>
  );
}

export default Intro;
