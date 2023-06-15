import React from 'react';
import { Route, Routes } from 'react-router-dom';

import StartSplash from './../pages/Splash/StartSplash';


function Router() {
    return (
        <Routes>
          <Route path="/" element={<StartSplash />}></Route>
          
        </Routes>
    );
}

export default Router;
