import React from "react";
import { ButtonWrapper, ModalBackDrop, ModalWrapper } from "./AlertModalStyle";

// props로 submitText : string | onSubmit : 함수 | onCancel : 함수 전달해주시면 됩니다.
export default function AlertModal(props) {
  return (
    <ModalBackDrop>
      <ModalWrapper>
        {props.children}
        <ButtonWrapper>
          <button type="button" onClick={() => props.onCancel()}>
            취소
          </button>
          <button type="button" onClick={() => props.onSubmit()}>
            {props.submitText}
          </button>
        </ButtonWrapper>
      </ModalWrapper>
    </ModalBackDrop>
  );
}
