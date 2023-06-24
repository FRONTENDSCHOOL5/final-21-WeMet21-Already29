import React, { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Loading from "./components/Loading";
const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>
);
