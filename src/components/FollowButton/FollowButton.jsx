import React from "react";
import { ButtonStyle } from "./FollowButtonStyle";

export default function Button({
  type,
  content,
  size,
  width,
  bgColor,
  color,
  border,
  disabled,
  onClick,
}) {
  return (
    <ButtonStyle
      type={type ? "button" : "submit"}
      size={size}
      width={width}
      bgColor={bgColor}
      color={color}
      border={border}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </ButtonStyle>
  );
}

