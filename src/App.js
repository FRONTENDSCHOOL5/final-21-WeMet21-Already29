import SignUp from "./pages/Profile";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import reset from "styled-reset";
import GlobalStyle from "./style/GlobalStyle"


function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Profile />
    </BrowserRouter>
  );
}
export default App;