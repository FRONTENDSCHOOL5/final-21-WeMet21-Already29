import React, { useContext, useEffect, useRef } from "react";
import BottomSheetContext from "../../../contexts/ModalContext/BottomSheetContext";
import { BottomSheetBackDrop, BottomSheetWrapper } from "./BottomSheetStyle";

export default function BottomSheet({ children }) {
  const { isBottomSheetOpen, setBottomSheetOpen } = useContext(BottomSheetContext);
  const bottomSheet = useRef(null);
  useEffect(() => {
    const firstEl = bottomSheet.current.firstChild,
      lastEl = bottomSheet.current.lastChild;

    firstEl.focus();

    firstEl.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && e.shiftKey) {
        e.preventDefault();
        lastEl.focus();
      }
    });
    lastEl.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        firstEl.focus();
      }
    });
  }, [bottomSheet]);
  return (
    <>
      <BottomSheetBackDrop onClick={() => setBottomSheetOpen(false)} />
      <BottomSheetWrapper ref={bottomSheet}>{children}</BottomSheetWrapper>
    </>
  );
}
