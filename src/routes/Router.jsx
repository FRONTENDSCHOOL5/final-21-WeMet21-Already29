import React, { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import ModalContext from "../contexts/ModalContext/ModalContext";
import BottomSheetContext from "../contexts/ModalContext/BottomSheetContext";

function Router() {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <BottomSheetContext.Provider value={{ isBottomSheetOpen, setBottomSheetOpen }}>
      <ModalContext.Provider value={{ isModalOpen, setModalOpen }}>
        <Routes></Routes>
      </ModalContext.Provider>
    </BottomSheetContext.Provider>
  );
}

export default Router;
