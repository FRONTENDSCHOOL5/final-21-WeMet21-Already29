import React from 'react';
import { Link } from 'react-router-dom';
import charaterLogo from '../../assets/images/character-logo.png'
import StyledIntroLoginPage from './IntroLoginStyle';

function IntroLoginPage() {
  return (
    <StyledIntroLoginPage>
        <section>
          <h1>입9팔9</h1>
          <p className='first-p'>데일리룩과 취향을 공유하며 </p>
          <p className='second-p'>지속가능한 패션을 함께 만들어가는 공간 </p>
        </section>

        <section>
          <img src={charaterLogo} alt="charaterLogo" className='character-logo'/>
        </section>
        
        <section className="login-join-section">
          <ul className="sns-login">
            <li className="sns-login-li">
              <Link to="/login" className='email-text'>
                <button className="email-login">이메일로 로그인</button>
              </Link> 
            </li>
          </ul>
          <ul className="login-join-cont">
            <li>
              <p className="emailLogin">처음오셨나요?</p>
            </li>
            <li>
              <Link to="/signup" className="emailJoin">이메일로 가입하기</Link>
            </li>
          </ul>
        </section>
    </StyledIntroLoginPage>
  );
}

export default IntroLoginPage;

