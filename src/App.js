import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import UploadProduct from "./pages/UploadProduct";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

const GlobalStyle = createGlobalStyle`
  ${reset}
  :root{
    --main-color: rgba(5, 139, 46, 1);
  }
  #root{
    width: min(80vw, 500px);
    margin: 0 auto;
  }
  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
  img{
    max-width: 100%;
    vertical-align: top;
  }
  a{
    text-decoration: none;
    color: initial;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Link to="/uploadProduct">상품 올리기</Link>
        <Link to="/productList">상품 리스트 불러오기</Link>
        <Routes>
          <Route path="/uploadProduct" element={<UploadProduct />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/product/*" element={<Outlet />}>
            <Route path="detail/:id" element={<ProductDetail />}></Route>
            <Route path="modify/:id" element={<UploadProduct />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
