import React from "react";
import BtnStyle from  "./ButtonStyle"

const Button = (props) => {
  const { type } = props;
  return (
    <BtnStyle type={type ? type : 'button'} {...props}>
      {props.children}
    </BtnStyle>
  );
};

export default Button;