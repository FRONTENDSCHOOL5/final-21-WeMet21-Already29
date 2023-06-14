import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import UploadProduct from "./pages/UploadProduct/UploadProduct";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ProductList from "./pages/ProductList/ProductList";
import GlobalStyle from "./style/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Link to="/uploadProduct">상품 올리기</Link>
        <Link to="/productlist">상품 리스트 불러오기</Link>
        <Routes>
          <Route path="/uploadProduct" element={<UploadProduct />}></Route>
          <Route path="/productlist" element={<ProductList />}></Route>
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
