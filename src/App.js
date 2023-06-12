import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Router from "./routes/Router";

const GlobalStyle = createGlobalStyle`
  ${reset}
  :root{
    --main-color: rgba(5, 139, 46, 1);
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
`;

function App() {
  return (
    <>
        <GlobalStyle />
          <Router />
    </>
  );
}
export default App;