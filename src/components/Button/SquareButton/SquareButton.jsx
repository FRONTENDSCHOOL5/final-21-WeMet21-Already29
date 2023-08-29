import React from "react";

import { Input, Label, RadioInput, RadioLabel } from "./SqareButton.style";

export default function SquareButton({ type, state, setState, data, name, value }) {
  const imgSrc = `../../../assets/${name}-${data}.png`;

  const buttons = {
    radio: (
      <>
        <RadioInput type={type} className="a11y-hidden" id={data} name={name} value={value} onChange={() => setState(data)} checked={data === state} required />
        <RadioLabel htmlFor={data} name={name} tabIndex={0}>
          {name !== "size" && (
            <span className="image-wrapper">
              <img src={imgSrc} alt="" />
            </span>
          )}

          <span className="category-text">{value}</span>
        </RadioLabel>
      </>
    ),
    checkbox: (
      <>
        <Input type={type} className="a11y-hidden" id={data} value={value} onChange={(e) => setState(e)} checked={state && typeof state === "object" && state.size && state.has(data)} required />
        <Label htmlFor={data} tabIndex={1}>
          {value}
        </Label>
      </>
    ),
  };
  return buttons[type];
}
