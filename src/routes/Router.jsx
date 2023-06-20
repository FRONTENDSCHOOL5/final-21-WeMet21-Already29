import React, { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import StartSplash from "./../pages/Splash/StartSplash";
import Login from "../pages/Login/Login";
// import SignUp from "../pages/SignUp/SignUp";
import HomeFeed from "../pages/HomeFeed/HomeFeed";
import UploadProduct from "../pages/UploadProduct/UploadProduct";
import ProductList from "../pages/ProductList/ProductList";
import Profile from "../pages/Profile/Profile";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import ModalContext from "../contexts/ModalContext/ModalContext";

function Router() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, setModalOpen }}>
      <Routes>
        <Route path="/" element={<StartSplash />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        {/* <Route path="/signup" element={<SignUp />}></Route> */}
        <Route path="/homefeed" element={<HomeFeed />}></Route>
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
    </ModalContext.Provider>
  );
}

export default Router;
