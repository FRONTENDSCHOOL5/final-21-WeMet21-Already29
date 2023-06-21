import React, { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import StartSplash from "./../pages/Splash/StartSplash";
import Login from "../pages/Login/Login";
import HomeFeed from "../pages/HomeFeed/HomeFeed";
import ModalContext from "../contexts/ModalContext/ModalContext";
import BottomSheetContext from "../contexts/ModalContext/BottomSheetContext";
import UploadProduct from "../pages/UploadProduct/UploadProduct";
import ProductList from "../pages/ProductList/ProductList";
import Profile from "../pages/Profile/Profile";
import ProductDetail from "../pages/ProductDetail/ProductDetail";

function Router() {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <BottomSheetContext.Provider value={{ isBottomSheetOpen, setBottomSheetOpen }}>
      <ModalContext.Provider value={{ isModalOpen, setModalOpen }}>
        <Routes>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/" element={<StartSplash />}></Route>
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
    </BottomSheetContext.Provider>
    );

}

export default Router;
