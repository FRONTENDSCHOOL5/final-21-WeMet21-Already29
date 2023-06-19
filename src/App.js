import GlobalStyle from "./style/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
// import Login from "./pages/Login/Login";
import PostDetail from "./pages/PostDetail/PostDetail";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        {/* <Login /> */}
        <PostDetail />
      </BrowserRouter>
    </>
  );
}
export default App;
