import React from "react";

import { StyleButton, ProfileNav, WhiteButton } from "./Button.style";

export default function Button({ category, type, width, height, to, disabled, children, fontSize, ...props }) {
  const button = {
    basic: (
      <StyleButton type={type} btnWidth={width} btnHeight={height} disabled={disabled} btnFontSize={fontSize} {...props}>
        {children}
      </StyleButton>
    ),
    white: (
      <WhiteButton type={type} btnWidth={width} btnHeight={height} btnFontSize={fontSize} {...props}>
        {children}
      </WhiteButton>
    ),
    profileNav: <ProfileNav to={to}>{children}</ProfileNav>,
  };

  return button[category];
}
