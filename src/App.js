import GlobalStyle from "./style/GlobalStyle";
import { BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
