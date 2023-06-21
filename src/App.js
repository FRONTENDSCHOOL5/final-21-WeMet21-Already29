import GlobalStyle from "./style/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </>
  );
}
export default App;
