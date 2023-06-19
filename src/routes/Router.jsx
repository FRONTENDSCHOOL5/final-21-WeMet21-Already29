import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartSplash from './../pages/Splash/StartSplash';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp'
import HomeFeed from '../pages/HomeFeed/HomeFeed';

function Router() {
    return (
        <Routes>
          <Route path="/" element={<StartSplash />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/homefeed" element={<HomeFeed />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/ProfileSetting" element={<ProfileSetting />}></Route>
        </Routes>
    );
}

export default Router;
