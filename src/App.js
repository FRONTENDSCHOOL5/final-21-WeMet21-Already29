import GlobalStyle from "./style/GlobalStyle";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import ProfileSetting from "./pages/ProfileSettings/ProfileSettings"
import SignUp from "./pages/SignUp/SignUp"

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
      <Routes>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/ProfileSetting" element={<ProfileSetting />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
