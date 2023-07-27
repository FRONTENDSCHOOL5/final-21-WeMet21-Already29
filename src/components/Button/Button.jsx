import React from "react";
import { StyleButton, ProfileNav, WhiteButton } from "./ButtonStyle";

export default function Button({ category, type, width, height, disabled, children, fontSize, ...props }) {
  const button = {
    basic: (
      <StyleButton type={type} width={width} height={height} disabled={disabled} fontSize={fontSize} {...props}>
        {children}
      </StyleButton>
    ),
    white: (
      <WhiteButton type={type} width={width} height={height} fontSize={fontSize} {...props}>
        {children}
      </WhiteButton>
    ),
    profileNav: <ProfileNav to="hello">{children}</ProfileNav>,
  };

  return button[category];
}
