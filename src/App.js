import GlobalStyle from "./style/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
// import Login from "./pages/Login/Login";
import Router from "./routes/Router";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        {/* <Login /> */}
        <Router />
      </BrowserRouter>
    </>
  );
}
export default App;
