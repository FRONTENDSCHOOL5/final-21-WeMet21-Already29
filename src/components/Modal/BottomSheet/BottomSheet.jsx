import React from "react";
import BottomSheetContext from "../../../contexts/ModalContext/BottomSheetContext";
import { BottomSheetBackDrop, BottomSheetWrapper } from "./BottomSheetStyle";

export default function BottomSheet({ children }) {
  return (
    <>
      <BottomSheetContext.Consumer>{({ setBottomSheetOpen }) => <BottomSheetBackDrop onClick={() => setBottomSheetOpen(false)} />}</BottomSheetContext.Consumer>
      <BottomSheetWrapper>{children}</BottomSheetWrapper>
    </>
  );
}
