import React, { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import ModalContext from "../contexts/ModalContext/ModalContext";
import BottomSheetContext from "../contexts/ModalContext/BottomSheetContext";
import PostUpload from "../pages/PostUpload/PostUpload";
import PostDetail from "../pages/PostDetail/PostDetail";

function Router() {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <BottomSheetContext.Provider value={{ isBottomSheetOpen, setBottomSheetOpen }}>
      <ModalContext.Provider value={{ isModalOpen, setModalOpen }}>
        <Routes>
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/upload" element={<PostUpload />} />
          <Route path="/upload/:id" element={<PostUpload />} />
        </Routes>
      </ModalContext.Provider>
    </BottomSheetContext.Provider>
  );
}

export default Router;
