import React from "react";
import StyledTopBasicNav from "./HeaderStyle";

export default function TopMainNav(props) {
  const goSearch = () => {
    window.location.href = "/search";
  };

  return (
    <StyledTopBasicNav>
      <span>{props.value}</span>
    </StyledTopBasicNav>
  );
}
