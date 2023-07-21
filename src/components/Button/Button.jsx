import React from "react";
import BtnStyle from "./ButtonStyle";

export default function Btn({
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
    <BtnStyle
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
    </BtnStyle>
  );
}
