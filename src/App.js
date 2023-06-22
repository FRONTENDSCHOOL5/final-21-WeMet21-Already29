import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";
import Router from "./routes/Router";
import PostUpload from "./pages/PostUpload/PostUpload";

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
