import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartSplash from './../pages/Splash/StartSplash';
import Login from '../pages/Login/Login';
import Home from "../pages/HomeFeed/HomeFeed";

function Router() {
    return (
      <Routes>
          <Route path="/" element={<StartSplash />}></Route>
<<<<<<< HEAD
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/homefeed" element={<HomeFeed />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/ProfileSetting" element={<ProfileSetting />}></Route>
        </Routes>
=======
          <Route path="/Login" element={<Login />}></Route>   
        <Route path="/home" element={<Home />} />     
      </Routes>
      
>>>>>>> 6f7a2ad471311709a01a7cf757b4dedff75dce05
    );
}

export default Router;
