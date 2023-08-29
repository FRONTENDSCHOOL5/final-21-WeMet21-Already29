import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./style/Global.style";
import Router from "./routes/Router";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}
export default App;
