import React from "react";
import { GreenSmButton } from "../Button/Button";
import { iconArrowLeft } from "./HeaderStyle";
import { StyledTopBasicNav, ImgIcon } from "./HeaderStyle";

export default function TopMainNav(props) {
  const goSearch = () => {
    window.location.href = "/search";
  };

  return (
    <StyledTopBasicNav>
      <ImgIcon src={iconArrowLeft} alt="iconArrowLeft" />
      <GreenSmButton onClick={props.handlePostUpload} contents="업로드"></GreenSmButton>
    </StyledTopBasicNav>
  );
}
