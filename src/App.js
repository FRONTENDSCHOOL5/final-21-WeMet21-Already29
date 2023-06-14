import { BrowserRouter } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import GlobalStyle from "./style/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    </>
  );
}
export default App;
