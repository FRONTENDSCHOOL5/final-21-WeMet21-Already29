import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import SearchPage from "../pages/Search/SearchPage";
import ModalContext from "../contexts/ModalContext/ModalContext";
import BottomSheetContext from "../contexts/ModalContext/BottomSheetContext";
import ProductEdit from "../pages/ProductEdit/ProductEdit";
import ProductSaleList from "../pages/ProductSaleList/ProductSaleList";
import Profile from "../pages/Profile/Profile";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import PostEdit from "../pages/PostEdit/PostEdit";
import PostDetail from "../pages/PostDetail/PostDetail";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/HomeFeed/HomeFeed";
import SignUpProfile from "../pages/SignUp/SignUpProfile/SignUpProfile";
import Error from "../pages/404/Error";
import FollowList from "../pages/FollowList/FollowList";
import UserInfo from "../contexts/LoginContext";
import Splash from "../pages/Splash/Splash";

const Providers = ({ children }) => {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  return (
    <BottomSheetContext.Provider value={{ isBottomSheetOpen, setBottomSheetOpen }}>
      <ModalContext.Provider value={{ isModalOpen, setModalOpen }}>
        <UserInfo.Provider value={{ userInfo, setUserInfo }}>{children}</UserInfo.Provider>
      </ModalContext.Provider>
    </BottomSheetContext.Provider>
  );
};

export default function Router() {
  const { pathname } = useLocation();
  console.log(useLocation());
  const userInfo = localStorage.getItem("userInfo");
  const navigate = useNavigate();

  const isAcceptpath = (path) => {
    const acceptPathNames = ["/", "/login", "/signup"];

    for (let i = 0; i < acceptPathNames.length; i++) {
      if (acceptPathNames[i] === path) return true;
    }
    return false;
  };
  useEffect(() => {
    if (!userInfo && !isAcceptpath(pathname)) {
      alert("로그인 후 접근하세요");
      navigate("/login");
    }
  }, []);

  return (
    <Providers>
      <h1 className="a11y-hidden">입구팔구</h1>
      <Routes>
        <Route path="/" element={<Splash />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>

        <Route path="/profile/*" element={<Outlet />}>
          <Route path=":id/*" element={<Outlet />}>
            <Route path="" element={<Profile />} />
            <Route path="following" element={<FollowList />} />
            <Route path="follower" element={<FollowList />} />
            <Route path="modify" element={<SignUpProfile />} />
          </Route>
        </Route>

        <Route path="/product/*" element={<Outlet />}>
          <Route path="detail/:id" element={<ProductDetail />}></Route>
          <Route path="upload" element={<ProductEdit />}></Route>
          <Route path="modify/:id" element={<ProductEdit />}></Route>
          <Route path="list/:id" element={<ProductSaleList />}></Route>
        </Route>

        <Route path="post/*" element={<Outlet />}>
          <Route path=":id" element={<PostDetail />}></Route>
          <Route path="upload" element={<PostEdit />}></Route>
          <Route path="modify/:id" element={<PostEdit />}></Route>
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </Providers>
  );
}
