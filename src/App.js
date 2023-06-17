import GlobalStyle from "./style/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import PostUpload from "./pages/PostUpload/PostUpload";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <PostUpload />
      </BrowserRouter>
    </>
  );
}
export default App;
