import React, { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import StartSplash from "./../pages/Splash/StartSplash";
import Login from "../pages/Login/Login";
import HomeFeed from "../pages/HomeFeed/HomeFeed";
import SearchPage from "../pages/Search/SearchPage";
import ModalContext from "../contexts/ModalContext/ModalContext";
import BottomSheetContext from "../contexts/ModalContext/BottomSheetContext";
import UploadProduct from "../pages/UploadProduct/UploadProduct";
import ProductList from "../pages/ProductList/ProductList";
import Profile from "../pages/Profile/Profile";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import PostUpload from "../pages/PostUpload/PostUpload";
import PostDetail from "../pages/PostDetail/PostDetail";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/HomeFeed/HomeFeed";
import SignUpProfile from "../pages/SignUp/SignUpProfile/SignUpProfile";
import Error from "../pages/404/Error";
import FollowerList from "../pages/FollowerList/FollowerList";

function Router() {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <BottomSheetContext.Provider value={{ isBottomSheetOpen, setBottomSheetOpen }}>
      <ModalContext.Provider value={{ isModalOpen, setModalOpen }}>
        <Routes>
          <Route path="/" element={<StartSplash />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<HomeFeed />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>

          <Route path="/profile/*" element={<Outlet />}>
            <Route path=":id/*" element={<Outlet />}>
              <Route path="" element={<Profile />} />
              <Route path="following" element={<FollowerList followType="followingList" />} />
              <Route path="follower" element={<FollowerList followType="followerList" type="followers" />} />
              <Route path="modify" element={<SignUpProfile />} />
            </Route>
          </Route>

          <Route path="/product/*" element={<Outlet />}>
            <Route path="detail/:id" element={<ProductDetail />}></Route>
            <Route path="upload" element={<UploadProduct />}></Route>
            <Route path="modify/:id" element={<UploadProduct />}></Route>
            <Route path="list/:id" element={<ProductList />}></Route>
          </Route>

          <Route path="post/*" element={<Outlet />}>
            <Route path=":id" element={<PostDetail />}></Route>
            <Route path="upload" element={<PostUpload />}></Route>
            <Route path="modify/:id" element={<PostUpload />}></Route>
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </ModalContext.Provider>
    </BottomSheetContext.Provider>
  );
}

export default Router;
