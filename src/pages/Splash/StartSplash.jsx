import React, { useState, useEffect } from "react";
import SplashPage from "../Splash/SplashPage";
import IntroLoginPage from "../IntroLogin/IntroLoginPage";

const StartSplash = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.location.pathname === "/") {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, []);

  return loading ? <SplashPage /> : <IntroLoginPage />;
};

export default StartSplash;
