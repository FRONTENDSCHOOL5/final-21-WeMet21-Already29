import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartSplash from './../pages/Splash/StartSplash';
import Login from '../pages/Login/Login';
import Home from "../pages/HomeFeed/HomeFeed";
import SearchPage from "../pages/Search/SearchPage";

function Router() {
    return (
      <Routes>
          <Route path="/" element={<StartSplash />}></Route>
          <Route path="/Login" element={<Login />}></Route>   
        <Route path="/home" element={<Home />} />     
        <Route path="/search" element={<SearchPage />}></Route>
      </Routes>
      
    );
}

export default Router;
