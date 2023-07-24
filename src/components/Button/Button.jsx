import React from "react";
import { StyleButton, ProfileNav, ProfileUna } from "./ButtonStyle";

export default function Button({ category, type, width, height, disabled, children, ...props }) {
  console.log(props);
  const button = {
    basic: (
      <StyleButton type={type} width={width} height={height} disabled={disabled} {...props}>
        {children}
      </StyleButton>
    ),
    white: <ProfileUna>언팔로우</ProfileUna>,
    profileNav: <ProfileNav to="hello">{children}</ProfileNav>,
  };

  return button[category];
}
