import React, { useContext } from "react";
import { ButtonGroup, ModalBackDrop, ModalWrapper } from "./AlertModalStyle";
import ModalContext from "../../../contexts/ModalContext/ModalContext";

// props로 submitText : string | onSubmit : 함수 | onCancel : 함수 전달해주시면 됩니다.
export default function AlertModal({ children, onSubmit, submitText, onCancel }) {
  const { isModalOpen, setModalOpen } = useContext(ModalContext);
  return (
    <ModalBackDrop>
      <ModalWrapper>
        {children}
        <ButtonGroup>
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
