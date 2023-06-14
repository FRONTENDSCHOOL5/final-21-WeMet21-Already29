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

    --font-lg-size: 1.5rem; //24px 
    --font-md-size: 0.875rem; //14px 
    --font-sm-size: 0.75rem; //12px 

    --font-Bold: 700;
    --font-Medium: 500;
    --font-Regular: 400;
  }

  #root{
    width: min(80vw, 500px);
    margin: 0 auto;
  }

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

  img{
    max-width: 100%;
    vertical-align: top;
  }

  a{
    text-decoration: none;
    color: initial;
  }
`;

export default GlobalStyle;
