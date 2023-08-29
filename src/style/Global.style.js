import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  html{
    font-size: 10px;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
  }
  
  :root {
    --main-color: #058B2E; 
    --unactive-color: rgba(5, 139, 46, 0.4); //비활성화컬러
    --white-color:#FBFBFB;
    --gray-color: #767676;
    --line-gray-color:#DBDBDB;
    --box-gray-color: #F2F2F2;
    --font-red-color:#EB5757;
    --font-black-color: #0B0B0B;

    --font-lg-size: 2.4rem; //24px 
    --font-md-size: 1.4rem; //14px 
    --font-sm-size: 1.2rem; //12px 


    --font-Bold: 700;
    --font-Medium: 500;
    --font-Regular: 400;
  }

  #root{
    width: 390px;
    margin: 0 auto;
    min-height: 100vh;
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

    &:focus{
      outline: 2px solid #000;
    }
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

  // 스크롤바 숨김 처리
  html {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
  }
  html::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
  }

  // 키보드 접근으로만 outline 보일 수 있도록
  :focus:not(:focus-visible) {
    outline: 0;
  }

  #root .swiper-pagination-bullet-active{
    background: var(--main-color) ;
  }
`;

export default GlobalStyle;
