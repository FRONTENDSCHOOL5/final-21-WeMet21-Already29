import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');
  
  body {
    font-family: 'Noto Sans KR', sans-serif;
  }
  
  :root {
    --main-color: #058B2E; 
    --unactive-color: rgba(5, 139, 46, 0.4); //비활성화컬러
    --white-color:#FBFBFB;
    --gray-color: #767676;
    --line-gray-color:#DBDBDB;
    --font-red-color:#EB5757;
    --font-black-color: #0B0B0B;

    --font-lg-size: 2.4rem; 
    --font-md-size: 1.4rem;  
    --font-sm-size: 1.2rem; 

    --font-Bold: 700;
    --font-Medium: 500;
    --font-Regular: 400;
  }

  #root{
    width: min(80vw, 500px);
    margin: 0 auto;
    height: 100vh;
  }

  img{
    max-width: 100%;
    vertical-align: top;
  }

  a{
    text-decoration: none;
    color: initial;
  }

  button {
    all: unset;
    cursor: pointer;
  }

  //텍스트 숨김 처리
  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }

`;

export default GlobalStyle;
