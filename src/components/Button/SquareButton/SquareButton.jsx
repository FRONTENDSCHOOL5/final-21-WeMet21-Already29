import styled from "styled-components";
import React from "react";

export const Input = styled.input`
  + label {
    transition: all.2s;
    font-size: 1.4rem;
    user-select: none;
    cursor: pointer;
    background-color: var(--unactive-color);
    border-radius: 30px;
    padding: 10px 15px;
    font-weight: 500;

    :hover {
      background-color: var(--main-color);
    }
  }
  :checked + label {
    background-color: var(--main-color);
    color: var(--white-color);
  }
`;

export default function SquareButton({ type, state, setState, data, name, value }) {
  const buttons = {
    radio: (
      <>
        <Input type={type} className="a11y-hidden" id={data} name={name} value={value} onChange={() => setState(data)} checked={data === state} required />
        <label htmlFor={data}>{value}</label>
      </>
    ),
    checkbox: (
      <>
        <Input type={type} className="a11y-hidden" id={data} value={value} onChange={(e) => setState(e)} checked={state && typeof state === "object" && state.size && state.has(data)} required />
        <label htmlFor={data}>{value}</label>
      </>
    ),
  };
  return buttons[type];
}
