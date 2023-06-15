import Profile from "./pages/Profile/Profile";
import GlobalStyle from "./style/GlobalStyle";
import { BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyle />

      <BrowserRouter>
        <Profile />
        <Routes></Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
