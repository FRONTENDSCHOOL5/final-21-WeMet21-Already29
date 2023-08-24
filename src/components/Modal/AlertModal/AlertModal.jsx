import React, { useContext, useEffect, useRef } from "react";
import { ButtonGroup, ModalBackDrop, ModalWrapper } from "./AlertModalStyle";
import ModalContext from "../../../contexts/ModalContext/ModalContext";

// props로 submitText : string | onSubmit : 함수 | onCancel : 함수 전달해주시면 됩니다.
export default function AlertModal({ children, onSubmit, submitText, onCancel }) {
  const { isModalOpen, setModalOpen } = useContext(ModalContext);
  const buttons = useRef(null);
  useEffect(() => {
    const firstEl = buttons.current.firstChild,
      lastEl = buttons.current.lastChild;

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

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setModalOpen(false);
    });
  }, [isModalOpen, setModalOpen]);
  return (
    <ModalBackDrop>
      <ModalWrapper>
        {children}
        <ButtonGroup ref={buttons}>
          <button type="button" onClick={() => (onCancel ? onCancel(false) : setModalOpen(false))}>
            취소
          </button>
          <button
            type="button"
            onClick={() => {
              setModalOpen(false);
              onSubmit();
            }}
          >
            {submitText}
          </button>
        </ButtonGroup>
      </ModalWrapper>
    </ModalBackDrop>
  );
}
