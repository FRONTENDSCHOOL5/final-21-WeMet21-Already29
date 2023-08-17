import styled, { css } from "styled-components";
import React from "react";

const Input = styled.input`
  :checked + label {
    background-color: var(--main-color);
    color: var(--white-color);
  }
`;

const Label = styled.label`
  font-size: 1.4rem;
  user-select: none;
  cursor: pointer;
  background-color: var(--unactive-color);
  border-radius: 30px;
  padding: 10px 15px;
  font-weight: 500;
`;

const RadioInput = styled(Input)`
  :checked + label {
    background-color: ${(props) => (props.name === "size" ? "var(--unactive-color)" : "initial")};
  }

  :checked + label .image-wrapper {
    transition: 0.2s ease;
    background-color: var(--unactive-color);
  }
`;

const RadioLabel = styled(Label)`
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
  ${({ name: productCategory }) =>
    productCategory === "size"
      ? css`
          background-color: var(--box-gray-color);
          width: 40px;
          height: 30px;
          border-radius: 5px;
        `
      : css`
          background-color: initial;
          flex-direction: column;
          gap: 5px;
        `};

  img {
    object-fit: contain;
  }

  .image-wrapper {
    width: 30px;
    height: 30px;
    padding: 12px;
    border-radius: 50%;
  }

  :hover .image-wrapper {
    outline: 1px solid var(--unactive-color);
  }

  .category-text {
    font-size: 1rem;
    color: var(--gray-color);
    font-weight: 350;
  }
`;

export default function SquareButton({ type, state, setState, data, name, value }) {
  const imgSrc = `../../../assets/${name}-${data}.png`;
  const buttons = {
    radio: (
      <>
        <RadioInput type={type} className="a11y-hidden" id={data} name={name} value={value} onChange={() => setState(data)} checked={data === state} required />
        <RadioLabel htmlFor={data} name={name}>
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
        <Label htmlFor={data}>{value}</Label>
      </>
    ),
  };
  return buttons[type];
}
