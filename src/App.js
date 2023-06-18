import Profile from "./pages/Profile/Profile";
import GlobalStyle from "./style/GlobalStyle";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import UploadProduct from "./pages/UploadProduct/UploadProduct";
import ProductList from "./pages/ProductList/ProductList";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Login from "./pages/Login/Login";
import HomeFeed from "./pages/HomeFeed/HomeFeed";

function App() {
  return (
    <>
      <GlobalStyle />

      <BrowserRouter>
        <Link to="/uploadProduct">상품 올리기</Link>
        <Link to="/profile/testtestabc">프로필</Link>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/homefeed" element={<HomeFeed />}></Route>
          <Route path="/uploadProduct" element={<UploadProduct />}></Route>
          <Route path="/productlist/:id" element={<ProductList />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
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
