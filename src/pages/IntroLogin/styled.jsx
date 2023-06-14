import styled from 'styled-components';

const StyledIntroLoginPage = styled.main`
  height: 970px;
  width: 390px;
  position: relative;
  box-shadow: -1px 0 30px -1px #f2f2f2, 1px 0 30px -1px #f2f2f2;

  h1 {
    position: absolute;
    width: 127px;
    height: 30px;
    left: 34px;
    top: 187px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 30px;
    
    display: flex;
    align-items: flex-end;
  }

  .first-p {
    position: absolute;
    width: 291px;
    height: 50px;
    left: 34px;
    top: 242px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 25px;

    display: flex;
    align-items: flex-end;
    letter-spacing: -0.1em;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .second-p {
    position: absolute;
    width: 291px;
    height: 77px;
    left: 34px;
    top: 242px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 350;
    font-size: 18px;
    line-height: 25px;

    display: flex;
    align-items: flex-end;
    letter-spacing: -0.1em;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .character-logo {
    position: absolute;
    width: 322px;
    height: 237.74px;
    left: calc(50% - 322px/2);
    top: calc(50% - 237.74px/2 + 134.87px);
    
  }

  .login-join-section {
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 63px 4px 84px;
    background-color: #ffffff;
  }

  .sns-login-li img {
    width: 18px;
    height: 18px;
    background-image: url('');
  }

  .sns-login-li {
    display: flex;
    justify-content: center;
  }

  .sns-login-li button {
    cursor: pointer;
  }

  .sns-login-li button::before {
    content: '';
  }

  .blackmail-logo {
    position: absolute;
    left: 120px;
    right: 0%;
    top: 75px;
    width:300px;
  }

  .facebook-login {
    border: 1px solid #0B0B0B;
    border-radius: 10px;
    width: 322px;
    height: 44px;
    margin-bottom: 10px;
    background-position: 10px 8px;
    cursor: pointer;
    text-align: center;
  }

  .email-text {
    text-align: center;
    margin-left: 10px;
    
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
  }

  .facebook-login:hover {
    display: block;
    background-color: rgba(5, 139, 46, 1);
    color: white;
  }

  .login-join-cont {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .join {
    font-weight: bold;
  }

  .emailJoin {
    text-align: center;
    margin-left: 10px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
  }

  .emailLogin {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
  }

  .emailLogin::after {
    content: '';
    width: 1px;
    margin: 0 12px;
  }
`;

export default StyledIntroLoginPage;
