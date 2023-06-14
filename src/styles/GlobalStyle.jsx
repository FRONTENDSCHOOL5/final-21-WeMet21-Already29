import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    --main-color: #058B2E;
    --unactive-color: rgba(5, 139, 46, 0.4);
    --white-color:#FBFBFB;
    --gray-color: #767676;
    --line-gray-color:#DBDBDB;
    --font-red-color:#EB5757;
    --font-black-color: #0B0B0B;
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
