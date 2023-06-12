import LoginEmail from "./pages/LoginEmail";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
:root{
  --main-color : #058b2e
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
    <BrowserRouter>
      <GlobalStyle />
      <LoginEmail />
    </BrowserRouter>
  );
}
export default App;
