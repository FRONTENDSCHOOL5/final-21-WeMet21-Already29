import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import StartSplash from './../pages/Splash/StartSplash';
import Login from '../pages/Login/Login';
import Home from "../pages/HomeFeed/HomeFeed";
import Search from "../pages/Search/SearchPage";
import FollowerList from "../pages/FollowerList/FollowerList";
import Profile from "../pages/Profile/Profile";

function Router() {
  return (
      <Routes>
        <Route path="/" element={<StartSplash />}></Route>
        <Route path="/Login" element={<Login />}></Route>   
        <Route path="/home" element={<Home />} />     
        <Route path="/search" element={<Search />} />

        <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/:id" element={<Outlet />}>
            <Route path="followerlist" element={<FollowerList type="followers" followType="followerList"/>} />
            <Route path="followinglist" element={<FollowerList type="following" followType="followingList"/>} />
        </Route>
        
      </Routes>
    );
}

export default Router;




