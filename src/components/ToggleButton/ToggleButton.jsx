import React from "react";

import { Input, Label, RadioDiv, RadioInput, RadioLabel, Title } from "./ToggleButton.style";

const ToggleButton = ({ type, state, setState, data, name, value }) => {
  const imgSrc = `../../../assets/${name}-${data}.png`;

  const buttons = {
    // 상품 등록 / 프로필 설정 페이지 토글버튼
    radio: (
      <>
        <RadioInput className="a11y-hidden" type={type} id={data} name={name} value={value} onChange={() => setState(data)} checked={data === state.toString()} required />
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
    // 상품 필터기능 토글 체크박스
    // set 객체를 받아 상태값과 현재 값과 비교해 처리하는 로직
    checkbox: (
      <>
        <Input className="a11y-hidden" type={type} id={data} value={value} onChange={(e) => setState(e)} checked={state && typeof state === "object" && state.size && state.has(value)} required />
        <Label htmlFor={data} tabIndex={1}>
          {value}
        </Label>
      </>
    ),
  };
  return buttons[type];
};

// data : [key - value] 쌍으로 이뤄진 배열을 담는 2차원 배열
const ToggleButtonGroup = ({ title, data, name, state, setState, type }) => {
  const Wrapper = ({ children }) => {
    switch (type) {
      case "radio":
        return (
          <>
            <Title>{title}</Title>
            <RadioDiv>{children}</RadioDiv>
          </>
        );
      case "checkbox":
        return children;
      default:
    }
  };

  return (
    <Wrapper>
      {data.map(([key, value]) => (
        <React.Fragment key={key}>
          <ToggleButton type={type} state={state} data={key} name={name} value={value} className="a11y-hidden" setState={setState} />
        </React.Fragment>
      ))}
    </Wrapper>
  );
};

export default ToggleButtonGroup;
